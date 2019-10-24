const express = require("express");
const createError = require("http-errors");

const router = express.Router();

const { typeRequired, loginRequired } = require("../auth/_helpers");

const {
  getMandataireByUserId,
  updateMandataire,
  mesureEnAttente,
  update,
  getAllServicesByTis,
  getAllMandataires,
  getAllByMandatairesFilter,
  findMandataire
} = require("../db/queries/mandataires");

const {
  getCoordonneesByPostCode
} = require("../db/queries/geolocalisation_code_postal");

const { updateUser } = require("../db/queries/users");

const { getTiByUserId } = require("../db/queries/tis");

// récupère les données d'un mandataire

/**
 * @swagger
 * security:
 *   - cookieAuth: []
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: connect.sid
 *   requestBodies:
 *     ActiveMandataire:
 *       description: A JSON object containing mandataire
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 description: ID mandataire
 *                 type: integer
 *               etablissement:
 *                 description: Etablissement du mandataire
 *                 type: string
 *               email:
 *                 description: Email du mandataire
 *                 type: string
 *               nom:
 *                 description: Nom du mandataire
 *                 type: string
 *               prenom:
 *                 description: Prénom of mandataire
 *                 type: string
 *               code_postal:
 *                 description: Code postal du mandataire
 *                 type: string
 *               ville:
 *                 description: Ville du mandataire
 *                 type: string
 *               telephone:
 *                 description: Telephone du mandaaire
 *                 type: string
 *               adresse:
 *                 description: Adresse du mandataire
 *                 type: string
 *               mesures_en_cours:
 *                 description: nombre de mesures en cours du mandataire
 *                 type: integer
 *               dispo_max:
 *                 description: nombre de mesure maximum souhaité
 *                 type: integer
 *               telephone_portable:
 *                 description: telephone portable du mandataire
 *                 type: integer
 *               secretariat:
 *                 description: présence d'un secretariat
 *                 type: bool
 *               nb_secretariat:
 *                 description: nombre de secrétaire
 *                 type: float
 *               genre:
 *                 description: genre du mandataire
 *                 type: string
 *
 * @swagger
 * /mandataires/1:
 *   get:
 *     tags:
 *       - mandataire
 *     description: get specific mandataire
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return information for mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 */
router.get(
  "/1",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    try {
      const mandataire = await getMandataireByUserId(req.user.id);
      if (!mandataire) {
        throw createError.Unauthorized(`Mandataire not found`);
      }
      res.status(200).json(mandataire);
    } catch (err) {
      next(err);
    }
  }
);

const WHITELIST = [
  "nom",
  "prenom",
  "etablissement",
  "genre",
  "telephone",
  "telephone_portable",
  "email",
  "adresse",
  "code_postal",
  "ville",
  "dispo_max",
  "secretariat",
  "nb_secretariat",
  "mesures_en_cours",
  "zip"
];

const whiteList = obj =>
  Object.keys(obj)
    .filter(key => WHITELIST.indexOf(key) > -1)
    .reduce((a, c) => ({ ...a, [c]: obj[c] }), {});

// met à jour les données d'un mandataire

/**
 * @swagger
 * /mandataire/1:
 *   put:
 *     tags:
 *       - mandataire
 *     description: update mandataire
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/ActiveMandataire'
 *     responses:
 *       200:
 *         description: Return information for mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 */
router.put(
  "/1",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    try {
      const {
        nom,
        prenom,
        genre,
        telephone,
        telephone_portable,
        email,
        adresse,
        code_postal,
        ville,
        dispo_max,
        secretariat,
        zip,
        etablissement,
        mesures_en_cours,
        nb_secretariat,
        type
      } = req.body;

      const mandataire = await findMandataire(req, req.body.id);
      if (!mandataire) {
        throw createError.Unauthorized(`Mandataire not found`);
      }

      const body = whiteList(req.body);

      if (Object.keys(body).length === 0) {
        res.status(200).json(mandataire);
        return next();
      }

      await updateMandataire(mandataire.id, {
        genre,
        telephone,
        telephone_portable,
        adresse,
        code_postal,
        ville,
        dispo_max,
        secretariat,
        zip,
        etablissement,
        mesures_en_cours,
        nb_secretariat
      });
      await updateUser(req.user.id, {
        nom,
        prenom,
        email,
        type
      });
      const mandataireResult = await getMandataireByUserId(req.user.id);
      res.status(200).json(mandataireResult);
    } catch (err) {
      next(err);
    }
  }
);

// todo: test

/** @swagger
 * /mandataires/filters:
 *   post:
 *     tags:
 *       - mandataire
 *     description: Filters mandataire by geolocalisation
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: A JSON object containing localisation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latNorthEast:
 *                 type: float
 *                 required: true
 *               latSouthWest:
 *                 type: float
 *                 required: true
 *               longNorthEast:
 *                 type: float
 *                 required: true
 *               longSouthWest:
 *                 type: float
 *                 required: true
 *     responses:
 *       200:
 *         description: Return mandataires by geolocalisation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post("/filters", typeRequired("ti"), async (req, res, next) => {
  const ti = await getTiByUserId(req.user.id);
  const coords = [
    req.body.latNorthEast || 1,
    req.body.latSouthWest || 2,
    req.body.longNorthEast || 30,
    req.body.longSouthWest || 40
  ];
  getAllByMandatairesFilter(ti.id, ...coords)
    .then(function(mesures) {
      res.status(200).json(mesures);
    })
    .catch(next);
});

// récupère une liste de mandataires pour le user en question
// TODO : le user doit être un TI
// droits : ti lui-même
// récupère une liste de mandataires pour le user (ti) en question

/** @swagger
 * /mandataires :
 *   get:
 *     tags:
 *       - mandataire
 *     description: get mandataires for a specific Ti
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return mandataires for specific Ti
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", typeRequired("ti"), async (req, res, next) => {
  const ti = await getTiByUserId(req.user.id);
  getAllMandataires(ti.id)
    .then(mandataires => res.status(200).json(mandataires))
    .catch(error => next(error));
});

/** @swagger
 * /mandataires/services:
 *   get:
 *     tags:
 *       - mandataire
 *     description: get all services for a specific Ti
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return services for a specific Ti
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/services", typeRequired("ti"), async (req, res, next) => {
  const ti = await getTiByUserId(req.user.id);
  getAllServicesByTis(ti.id)
    .then(mandataires => res.status(200).json(mandataires))
    .catch(next);
});

router.get("/postcode/:postcode", loginRequired, async (req, res, next) => {
  try {
    const coordonnees = await getCoordonneesByPostCode(req.params.postcode);
    res.status(200).json(coordonnees);
  } catch (err) {
    next(err);
  }
});

/** @swagger
 * /mandataires/1/mesures-en-attente:
 *   put:
 *     tags:
 *       - mandataire
 *     description: update number of 'mesure en attente' from a mandataire
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: A JSON object containing mandataireId
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mandataire_id:
 *                 type: integer
 *                 required: true
 *     responses:
 *       200:
 *         description: Return information for mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 */
router.put(
  "/:mandataireId/mesures-en-attente",
  typeRequired("individuel", "prepose", "ti"),
  async (req, res, next) => {
    try {
      // const mandataire = await queries.getMandataireByUserId(req.user.id);
      // if (!mandataire) {
      //   return next(new Error(401));
      // }
      // récupères le nb de mesure attribuées pour ce mandataire
      if (!req.body.mandataire_id) {
        res.status(200).json();
        return;
      }
      const nbMesureAttente = await mesureEnAttente(req.body.mandataire_id);
      const mandataire = await update(req.body.mandataire_id, {
        mesures_en_attente: nbMesureAttente.count
      });
      res.status(200).json(mandataire);
    } catch (err) {
      next(err);
    }
  }
);

//ToDo(Adrien):Move /all to users routes
router.get(
  "/all",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    try {
      const mandataire = await getMandataireByUserId(req.user.id);
      if (!mandataire) {
        throw createError.Unauthorized(`Mandataire not found`);
      }
      res.status(200).json(mandataire);
    } catch (err) {
      next(err);
    }
  }
);

router.use("/", require("./commentaires"));
router.use("/", require("./mandataireMesures"));
router.use("/", require("./mandatairesEtablissements"));
router.use("/", require("./tis"));

module.exports = router;
