const express = require("express");

const router = express.Router();

const { loginRequired } = require("../auth/_helpers");

const {
  getMandataireById,
  getMandataireByUserId,
  updateMandataire,
  updateCountMesures,
  mesureEnAttente,
  update,
  getAllServicesByTis,
  getAllMandataires,
  getAllByMandatairesFilter,
  getCoordonneesByPostCode
} = require("../db/queries/mandataires");

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
router.get("/1", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  res.status(200).json(mandataire);
});

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
router.put("/1", loginRequired, async (req, res, next) => {
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
    type,
  } = req.body;

  const mandataire = await getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  const body = whiteList(req.body);

  if (Object.keys(body).length === 0) {
    res.status(200).json(mandataire);
    return next();
  }

  updateMandataire(mandataire.id, {
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
    nb_secretariat})
    .then(() =>
      updateUser(req.user.id, {
        nom,
        prenom,
        email,
        type
      })
    )
    .then(() => getMandataireById(mandataire.id))
    .then(mandataire => {
      res.status(200).json(mandataire);
    })
    .catch(error => {
      console.log(error);
      throw error;
      next(error);
    });
});

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
router.post("/filters", loginRequired, async (req, res, next) => {
  const ti = await getTiByUserId(req.user.id);
  getAllByMandatairesFilter(
    ti.id,
    req.body.latNorthEast,
    req.body.latSouthWest,
    req.body.longNorthEast,
    req.body.longSouthWest
  )
    .then(function(mesures) {
      res.status(200).json(mesures);
    })
    .catch(function(error) {
      throw error;
      next(error);
    });
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
router.get("/", loginRequired, async (req, res, next) => {
  if (req.user.type !== "ti") {
    return next(new Error(401));
  }
  const ti = await getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
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
router.get("/services", loginRequired, async (req, res, next) => {
  if (req.user.type !== "ti") {
    return next(new Error(401));
  }
  const ti = await getTiByUserId(req.user.id);
  if (!ti) {
    return next(new Error(401));
  }
  getAllServicesByTis(ti.id)
    .then(mandataires => res.status(200).json(mandataires))
    .catch(error => next(error));
});

// todo: test

router.post("/PosteCode", loginRequired, async (req, res, next) => {
  getCoordonneesByPostCode(req.body.codePoste)
    .then(function(mandataires) {
      res.status(200).json(mandataires);
    })
    .catch(function(error) {
      throw error;
      next(error);
    });
});

// ?
// met à jour la capacité ("disponibilite") d'un mandataire
// selon le nb de mesures en cours
// droits : ?
//
// TODO : trigger pour MAJ + rename colonnes
// met à jour la capacité ("disponibilite") d'un mandataire
// selon le nb de mesures en cours
// droits : user en cours

/** @swagger
 * /mandataires/1/capacite:
 *   put:
 *     tags:
 *       - mandataire
 *     description: update capacite of specific mandataire
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 */
router.put("/:mandataireId/capacite", async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  if (!mandataire) {
    return next(new Error(401));
  }
  updateCountMesures(mandataire.id).then(() => {
    res
      .status(200)
      .json(mandataire)
      .catch(error => next(error));
  });
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
  loginRequired,
  async (req, res, next) => {
    // const mandataire = await queries.getMandataireByUserId(req.user.id);
    // if (!mandataire) {
    //   return next(new Error(401));
    // }
    // récupères le nb de mesure attribuées pour ce mandataire
    const nbMesureAttente = mesureEnAttente(req.body.mandataire_id);
    update(req.body.mandataire_id, { mesures_en_attente: nbMesureAttente })
      .then(mandataire => res.status(200).json(mandataire))
      .catch(error => next(error));
  }
);

router.use("/", require("./commentaires"));
router.use("/", require("./mandataireMesures"));
router.use("/", require("./serviceAntennes"));
router.use("/", require("./mandatairesEtablissements"));
router.use("/", require("./tis"));
router.use("/", require("./importation-excel"));

module.exports = router;
