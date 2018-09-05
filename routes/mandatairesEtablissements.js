var express = require("express");
var router = express.Router();
var queries = require("../db/queries");

const { loginRequired } = require("../auth/_helpers");
const {
  getAllEtablissementsByMandataire,
  addMandataireToEtablissement,
  deleteMandataireEtablissement,
  getEtablissements
} = require("../db/queries/mandatairesEtablissement");

const { getMandataireByUserId } = require("../db/queries/mandataires");


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
 *     ActiveMandataireBody:
 *       description: A JSON object containing user active status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *                 required: true
 *   schemas:
 *     Mandataire:
 *       type: object
 *       properties:
 *         id:
 *           description: ID du mandataire
 *           type: integer
 *         type:
 *           description: Type de mandataire
 *           deprecated: true
 *           type: string
 *           enum:
 *             - preposes
 *             - individuels
 *             - services
 *         nom:
 *           description: Nom du mandataire
 *           type: string
 *         prenom:
 *           description: Prénom du mandataire
 *           type: string
 *         code_postal:
 *           description: Code postal du mandataire
 *           type: string
 *         created_at:
 *           description: Date de création du mandataire
 *           type: datetime
 *         last_login:
 *           description: Date de dernière connextion du mandataire
 *           type: datetime
 *
 *     SuccessResponse:
 *       description: conformation de succes
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           value: true
 *
 *     ActiveMandataireBody:
 *       description: changement etat du mandataire
 *       type: object
 *       properties:
 *         active:
 *           type: boolean
 *           value: true
 *
 * @swagger
 * /:mandataireId/etablissement:
 *   get:
 *     description: get list of etablissements for a specified mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: query
 *         description: filters to apply to the list. ex `?users.active=true`
 *         required: false
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mandataire'
 */
router.get("/1/etablissement", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  getAllEtablissementsByMandataire(mandataire.id)
    .then(etablissements => res.status(200).json(etablissements))
    .catch(error => next(error));
});

/** @swagger
 * /:mandataireId/etablissement:
 *   get:
 *     description: get list of etablissements for a specified mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: query
 *         description: filters to apply to the list. ex `?users.active=true`
 *         required: false
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mandataire'
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
 * /:mandataireId/etablissements:
 *   post:
 *     description: get list of etablissements for a specified mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: query
 *         description: filters to apply to the list. ex `?users.active=true`
 *         required: false
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mandataire'
 */
router.post("/1/etablissements", loginRequired, async (req, res, next) => {
  // secu : ensure TI can write on this mandataire + add related test
  const mandataire = await getMandataireByUserId(req.user.id);
  addMandataireToEtablissement({
    etablissement_id: req.body.etablissement_id,
    mandataire_id: mandataire.id
  })
    .then(commentaireID => getAllEtablissementsByMandataire(mandataire.id))
    .then(etablissements => res.status(200).json(etablissements))
    .catch(error => next(error));
});

/** @swagger
 * /:mandataireId/etablissements/:mandatairesEtablissementId:
 *   delete:
 *     description: get list of etablissements for a specified mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: query
 *         description: filters to apply to the list. ex `?users.active=true`
 *         required: false
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mandataire'
 */
// todo : ensure user can delete this entry
router.delete(
  "/1/etablissements/:mandatairesEtablissementId",
  loginRequired,
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    deleteMandataireEtablissement(req.params.mandatairesEtablissementId)
      .then(() => getAllEtablissementsByMandataire(mandataire.id))
      .then(etablissements => res.status(200).json(etablissements))
      .catch(error => {
        console.log(error);
        next(error);
      });
  }
);

/** @swagger
 * /:mandataireId/etablissements:
 *   get:
 *     description: get list of etablissements for a specified mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: query
 *         description: filters to apply to the list. ex `?users.active=true`
 *         required: false
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mandataire'
 */
router.get("/1/etablissements", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  getEtablissements(mandataire.id)
    .then(etablissements => res.status(200).json(etablissements))
    .catch(error => next(error));
});

module.exports = router;
