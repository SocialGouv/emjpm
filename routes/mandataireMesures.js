const express = require("express");

const router = express.Router();
const { typeRequired } = require("../auth/_helpers");

const {
  updateCountMesures,
  getMandataireByUserId,
  getMesuresMap
} = require("../db/queries/mandataires");

const { getTiByUserId } = require("../db/queries/tis");

const {
  updateMesure,
  getAllMesuresEteinte,
  getAllMesuresAttente,
  getMesuresEnCoursMandataire,
  addMesure
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
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    updateMesure(
      {
        id: req.params.mesureId,
        // ⚠️ ensure to override a mandataire only
        mandataire_id: mandataire.id
      },
      req.body
    )
      //.then(() => queries.getMesuresEnCoursMandataire(mandataire.id))
      // todo : trigger/view
      //.then(() => updateDateMesureUpdate(mandataire.id))
      // todo : trigger/view
      .then(() => updateCountMesures(mandataire.id))
      .then(() => getMesuresEnCoursMandataire(mandataire.id))
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
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
    const mandataire = await getMandataireByUserId(req.user.id);
    const ti = await getTiByUserId(req.user.id);
    const body = {
      ...req.body
    };
    if (req.user.type === "individuel" || req.user.type === "prepose") {
      body["mandataire_id"] = mandataire.id;
    }
    if (req.user.type === "ti") {
      body["ti_id"] = ti.id;
      body["cabinet"] = ti.cabinet;
      addMesure(body)
        .then(() => reservationEmail(ti, req.body.mandataire_id))
        .then(() => res.status(200).json({ success: true }))
        .catch(error => {
          console.log(error);
          next(error);
        });
    } else {
      addMesure(body)
        .then(() => getMesuresEnCoursMandataire(mandataire.id))
        .then(mesures => res.status(200).json(mesures))
        .then(() => updateCountMesures(mandataire.id))
        // todo : trigger/view
        .catch(error => {
          console.log(error);
          next(error);
        });
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
    addMesure({
      ...req.body
    })
      .then(mesures => res.status(200).json(mesures))
      .catch(error => {
        console.log(error);
        next(error);
      });
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
  typeRequired("individuel", "prepose", "service"),
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    getMesuresEnCoursMandataire(mandataire.id)
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
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
    const mandataire = await getMandataireByUserId(req.user.id);
    const mesures = await getMesuresMap(mandataire.id);
    res.status(200).json(mesures);
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
    const mandataire = await getMandataireByUserId(req.user.id);
    getAllMesuresAttente(mandataire.id)
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
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
    const mandataire = await getMandataireByUserId(req.user.id);
    getAllMesuresEteinte(mandataire.id)
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);
module.exports = router;
