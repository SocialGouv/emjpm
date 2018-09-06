const express = require("express");

const router = express.Router();
const { loginRequired, typeRequired } = require("../auth/_helpers");

const {
  updateCountMesures,
  updateDateMesureUpdate,
  getMandataireByUserId
} = require("../db/queries/mandataires");

const { getTiByUserId } = require("../db/queries/tis");

const {
  updateMesure,
  getAllMesuresEteinte,
  getAllMesuresAttente,
  getAllMesures,
  addMesure
} = require("../db/queries/mesures");

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
 *                 type: date
 *                 required: false
 *               type:
 *                 type: string
 *                 required: true
 *               date_ouverture:
 *                 type: date
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
 *                 type: date
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
 *     description: update a mesure for a specific mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: mesureId
 *         description: get id of specific mesure.
 *         required: true
 *         schema:
 *           type: object
 *     requestBodies:
 *       $ref: '#/components/requestBodies/mandataireMesures'
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
      //.then(() => queries.getAllMesures(mandataire.id))
      // todo : trigger/view
      //.then(() => updateDateMesureUpdate(mandataire.id))
      // todo : trigger/view
      .then(() => updateCountMesures(mandataire.id))
      .then(() => getAllMesures(mandataire.id))
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);

// create mesure

/** @swagger
 * /mandataires/1/mesures:
 *   post:
 *     description: post a new mesures for specific mandataire
 *     produces:
 *       - application/json
 *     requestBodies:
 *       $ref: '#/components/requestBodies/mandataireMesures'
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
      addMesure(body)
        .then(mesures => res.status(200).json({ success: true }))
        .catch(error => {
          console.log(error);
          next(error);
        });
    } else {
      addMesure(body)
        .then(() => getAllMesures(mandataire.id))
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
 *     description: post a new reservation mesure
 *     produces:
 *       - application/json
 *     requestBodies:
 *       $ref: '#/components/requestBodies/mandataireMesures'
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
 *     description: get all mesures en cours for a specific mandataires
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get(
  "/:mandataireId/mesures",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    getAllMesures(mandataire.id)
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);

/** @swagger
 * /mandataires/1/mesuresForMaps:
 *   get:
 *     description: get all mesures for a specific mandataire to display inside a map
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get(
  "/:mandataireId/mesuresForMaps",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    const mesures = await getMesuresMap(mandataire.id);
    res.status(200).json(mesures);
    next();
  }
);

/** @swagger
 * /mandataires/1/mesures/attente:
 *   get:
 *     description: get all mesures en attente for a specific mandataire
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
 *     description: get all mesures eteintes for a specific mandataire
 *     produces:
 *       - application/json
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
