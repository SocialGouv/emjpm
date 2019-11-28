const express = require("express");
const createError = require("http-errors");

const router = express.Router();

const { typeRequired } = require("../auth/_helpers");
const whitelist = require("../db/queries/whitelist");
const {
  getAllMesuresByTis,
  getDepartementByCodePostal
} = require("../db/queries/mesures");
const {
  getMandataireById,
  findMandataire
} = require("../db/queries/mandataires");

const ALLOWED_FILTERS = [
  "code_postal",
  "ville",
  "etablissement",
  "mandataire_id",
  "annee",
  "type",
  "date_ouverture",
  "residence",
  "civilite",
  "status",
  "ti_id",
  "cabinet",
  "id",
  "numero_dossier",
  "extinction",
  "reason_extinction",
  "numero_rg",
  "department_id"
];

const {
  updateCountMesures,
  getMesuresMap,
  isMandataireInTi
} = require("../db/queries/mandataires");

const { getTiByUserId } = require("../db/queries/tis");

const {
  updateMesure,
  getAllMesuresEteinte,
  getAllMesuresAttente,
  getMesuresEnCoursMandataire,
  addMesure,
  getCityCoordinates
} = require("../db/queries/mesures");

const { reservationEmail } = require("../email/reservation-email");

/**
 * @swagger
 *
 * components:
 *   requestBodies:
 *     mandataireMesures:
 *       description: A JSON object containing mesures parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               code_postal:
 *                 type: string
 *                 required: true
 *               ville:
 *                 type: string
 *                 required: true
 *               etablissement:
 *                 type: string
 *                 required: true
 *               mandataire_id:
 *                 type: integer
 *                 required: true
 *               annee:
 *                 type: string
 *                 required: false
 *               type:
 *                 type: string
 *                 required: true
 *               date_ouverture:
 *                 type: string
 *                 required: true
 *               residence:
 *                 type: string
 *                 required: true
 *               civilite:
 *                 type: string
 *                 required: true
 *               status:
 *                 type: string
 *                 required: false
 *               extinction:
 *                 type: string
 *                 required: true
 *               etablissement_id:
 *                 type: integer
 *                 required: true
 *               ti_id:
 *                 type: integer
 *                 required: true
 */

/** @swagger
 * /mandataires/1/mesures/:mesureId:
 *   put:
 *     tags:
 *       - mandataireMesure
 *     description: update a mesure for a specific mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: mesureId
 *         description: mesure id.
 *         required: true
 *         schema:
 *           type: object
 *     requestBody:
 *       $ref: '#/components/requestBodies/mandataireMesures'
 *     responses:
 *       200:
 *         description: Return all mesures of a mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.put(
  "/:mandataireId/mesures/:mesureId",
  typeRequired("individuel", "prepose", "ti"),
  async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(200).json();
      }

      // TODO(tglatt): make code postal required for all roles.
      let departement;
      if (req.body.code_postal) {
        departement = await getDepartementByCodePostal(req.body.code_postal);
      }

      if (req.user.type === "individuel" || req.user.type === "prepose") {
        const mandataire = await findMandataire(req, req.params.mandataireId);
        await updateMesure(
          {
            id: req.params.mesureId,
            // ⚠️ ensure to override a mandataire only
            mandataire_id: mandataire.id
          },
          whitelist(
            {
              ...req.body,
              department_id: departement ? departement.id : undefined
            },
            ALLOWED_FILTERS
          )
        );
        await updateCountMesures(mandataire.id);
        const mesures = await getMesuresEnCoursMandataire(mandataire.id);
        res.status(200).json(mesures);
      } else if (req.user.type === "ti") {
        const ti = await getTiByUserId(req.user.id);
        await updateMesure(
          {
            id: req.body.id || req.params.mesureId, //todo : WHY req.body.id VS req.params.mesureId ???
            // ⚠️ ensure to override a tI only
            ti_id: ti.id
          },
          whitelist(req.body, ALLOWED_FILTERS)
        );

        const mesures = await getAllMesuresByTis(ti.id);

        res.status(200).json(mesures);
      }
    } catch (err) {
      next(err);
    }
  }
);

// create mesure

/** @swagger
 * /mandataires/1/mesures:
 *   post:
 *     tags:
 *       - mandataireMesure
 *     description: post a new mesures for specific mandataire
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/mandataireMesures'
 *     responses:
 *       200:
 *         description: Return all mesures of a mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post(
  "/:mandataireId/mesures",
  typeRequired("individuel", "prepose", "ti"),
  async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        // return empty response when no data passed
        res.status(200).json();
        return;
      }

      // TODO(tglatt): make code postal required for all roles.
      let departement;
      if (req.body.code_postal) {
        departement = await getDepartementByCodePostal(req.body.code_postal);
      }

      if (req.user.type === "individuel" || req.user.type === "prepose") {
        const mandataire = await findMandataire(req, req.body.mandataire_id);

        const body = {
          ...req.body,
          mandataire_id: mandataire && mandataire.id,
          department_id: departement ? departement.id : undefined
        };
        if (!body.mandataire_id) {
          throw createError.UnprocessableEntity("Mandataire not found");
        }
        await addMesure(body);
        await updateCountMesures(body.mandataire_id);
        const mesures = await getMesuresEnCoursMandataire(body.mandataire_id);
        res.status(200).json(mesures);
      } else if (req.user.type === "ti") {
        const ti = await getTiByUserId(req.user.id);
        if (ti && req.body.mandataire_id) {
          const manda = await getMandataireById(req.body.mandataire_id);

          const bodyTi = {
            ...req.body,
            mandataire_id: manda && manda.id
          };

          const isAllowed = await isMandataireInTi(
            req.body.mandataire_id,
            ti.id
          );

          // TI cannot post for some other TI mandataire
          if (!isAllowed) {
            throw createError.Unauthorized(`Mandataire not found`);
          }
          await addMesure({
            ...bodyTi,
            ti_id: ti.id,
            cabinet: ti.cabinet,
            department_id: departement ? departement.id : undefined
          });
          await reservationEmail(ti, bodyTi);
          res.status(200).json({ success: true });
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

/** @swagger
 * /mandataires/1/mesure-reservation:
 *   post:
 *     tags:
 *       - mandataireMesure
 *     description: post a new "reservation" mesure
 *     produces:
 *       - application/json
 *     requestBody:
 *       $ref: '#/components/requestBodies/mandataireMesures'
 *     responses:
 *       200:
 *         description: Return all mesures of a mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post(
  "/:mandataireId/mesure-reservation",
  typeRequired("ti"),
  async (req, res, next) => {
    try {
      const ti = await getTiByUserId(req.user.id);
      if (ti) {
        const isAllowed = await isMandataireInTi(
          req.params.mandataireId,
          ti.id
        );
        // TI cannot post for some other TI mandataire
        if (!isAllowed) {
          throw createError.Unauthorized(`Mandataire not found`);
        }
      }

      const mesures = await addMesure({
        ...req.body
      });
      res.status(200).json(mesures);
    } catch (err) {
      next(err);
    }
  }
);

/** @swagger
 * /mandataires/1/mesures:
 *   get:
 *     tags:
 *       - mandataireMesure
 *     description: get all active "mesures" for a mandataires
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all active "mesures" of a mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/:mandataireId/mesures",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    try {
      const mandataire = await findMandataire(req, req.params.mandataireId);
      if (!mandataire) {
        throw createError.Unauthorized(`Mandataire not found`);
      }
      const mesures = await getMesuresEnCoursMandataire(mandataire.id);
      res.status(200).json(mesures);
    } catch (err) {
      next(err);
    }
  }
);

//ToDo doublon
/** @swagger
 * /mandataires/1/mesuresForMaps:
 *   get:
 *     tags:
 *       - mandataireMesure
 *     description: get all mesures for a mandataire to display inside a map
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all mesures of a mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/:mandataireId/mesuresForMaps",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    try {
      const mandataire = await findMandataire(req, req.params.mandataireId);
      if (!mandataire) {
        throw createError.Unauthorized(`Mandataire not found`);
      }
      const mesures = await getMesuresMap(mandataire.id);
      const mesuresWithCityCoordinates = mesures.map(async mesure => {
        const [cityCoordinates] = await getCityCoordinates(
          mesure.ville.toUpperCase(),
          mesure.code_postal
        ).then(coordinates =>
          coordinates.filter(cityMesure => {
            return cityMesure.ville === mesure.ville.toUpperCase();
          })
        );
        return {
          count: mesure.count,
          array_agg: mesure.array_agg,
          city: mesure.ville,
          code_postal: mesure.code_postal,
          latitude: cityCoordinates
            ? cityCoordinates.latitude
            : mesure.latitude,
          longitude: cityCoordinates
            ? cityCoordinates.longitude
            : mesure.longitude
        };
      });
      Promise.all(mesuresWithCityCoordinates).then(results =>
        res.status(200).json(results)
      );
    } catch (err) {
      next(err);
    }
  }
);

/** @swagger
 * /mandataires/1/mesures/attente:
 *   get:
 *     tags:
 *       - mandataireMesure
 *     description: get all "mesures en attente" for a specific mandataire
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all "mesures en attente" of a mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/:mandataireId/mesures/attente",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    try {
      const mandataire = await findMandataire(req, req.params.mandataireId);
      if (!mandataire) {
        throw createError.Unauthorized(`Mandataire not found`);
      }
      const mesures = await getAllMesuresAttente(mandataire.id);
      res.status(200).json(mesures);
    } catch (err) {
      next(err);
    }
  }
);

/** @swagger
 * /mandataires/1/mesures/Eteinte:
 *   get:
 *     tags:
 *       - mandataireMesure
 *     description: get all "mesures eteintes" for a specific mandataire
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all "mesures eteintes" of a mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/:mandataireId/mesures/Eteinte",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    try {
      const mandataire = await findMandataire(req, req.params.mandataireId);
      const mesures = await getAllMesuresEteinte(mandataire.id);
      res.status(200).json(mesures);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
