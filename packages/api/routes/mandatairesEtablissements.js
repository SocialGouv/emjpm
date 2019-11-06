var express = require("express");
var router = express.Router();

const { loginRequired } = require("../auth/_helpers");
const {
  getAllEtablissementsByMandataire,
  addMandataireToEtablissement,
  deleteMandataireEtablissement,
  getEtablissements
} = require("../db/queries/mandatairesEtablissement");

const { getMandataireByUserId } = require("../db/queries/mandataires");

/*
 * @swagger
 * mandataires/1/etablissement:
 *   get:
 *   tags:
 *       - etablissement
 *     description: get list of etablissements for a specified mandataire
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return list of etablissements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/:mandataireID/etablissement",
  loginRequired,
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    getAllEtablissementsByMandataire(mandataire.id)
      .then(etablissements => res.status(200).json(etablissements))
      .catch(error => next(error));
  }
);

//ToDo rm

/** @swagger
 * mandataires/:mandataireID/tisEtablissement:
 *   get:
 *     tags:
 *         - etablissement
 *     description: get list of etablissements for a specified mandataire for specific tis
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: mandataireID
 *         description:  mandataire id
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
//todo: secu
router.get(
  "/:mandataireID/tisEtablissement",
  loginRequired,
  async (req, res, next) => {
    getAllEtablissementsByMandataire(req.params.mandataireID)
      .then(etablissements => res.status(200).json(etablissements))
      .catch(error => next(error));
  }
);

/** @swagger
 * mandataires/1/etablissements:
 *   post:
 *     tags:
 *       - etablissement
 *     description: add an etablissement to a mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: query
 *         required: false
 *         schema:
 *           type: object
 *     requestBody:
 *       description: A JSON object containing etablissement
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etablissement_id:
 *                 type: integer
 *                 required: true
 *     responses:
 *       200:
 *         description: Return all etablissements for specific mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post(
  "/:mandataireID/etablissements",
  loginRequired,
  async (req, res, next) => {
    // secu : ensure TI can write on this mandataire + add related test
    const mandataire = await getMandataireByUserId(req.user.id);
    addMandataireToEtablissement({
      etablissement_id: req.body.etablissement_id,
      mandataire_id: mandataire.id
    })
      .then(() => getAllEtablissementsByMandataire(mandataire.id))
      .then(etablissements => res.status(200).json(etablissements))
      .catch(error => next(error));
  }
);

/** @swagger
 * mandataires/1/etablissements/:mandatairesEtablissementId:
 *   delete:
 *     tags:
 *       - etablissement
 *     description: delete etablissement
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: paths
 *         name: mandatairesEtablissementId
 *         description: etablissement id
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
// todo : ensure user can delete this entry
router.delete(
  "/:mandataireID/etablissements/:mandatairesEtablissementId",
  loginRequired,
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    deleteMandataireEtablissement(req.params.mandatairesEtablissementId)
      .then(() => getAllEtablissementsByMandataire(mandataire.id))
      .then(etablissements => res.status(200).json(etablissements))
      .catch(error => {
        /* eslint-disable no-console */
        console.log(error);
        /* eslint-enable no-console */
        next(error);
      });
  }
);

// Change location of this routes
/** @swagger
 * mandataires/1/etablissements:
 *   get:
 *     tags:
 *       - etablissement
 *     description: get list of etablissements.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/:mandataireID/etablissements",
  loginRequired,
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    getEtablissements(mandataire.id)
      .then(etablissements => res.status(200).json(etablissements))
      .catch(error => next(error));
  }
);

module.exports = router;
