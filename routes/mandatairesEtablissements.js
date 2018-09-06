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
 *     description: get list of etablissements for a specified mandataire
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 */
router.get("/1/etablissement", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  getAllEtablissementsByMandataire(mandataire.id)
    .then(etablissements => res.status(200).json(etablissements))
    .catch(error => next(error));
});

/** @swagger
 * mandataires/:mandataireID/tisEtablissement:
 *   get:
 *     description: get list of etablissements for a specified mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: mandataireID
 *         description: get mandataire id
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
 *     description: post an etablissement for a specified mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: query
 *         description: filters to apply to the list. ex `?users.active=true`
 *         required: false
 *         schema:
 *           type: object
 *     requestBodies:
 *     ActiveMandataireBody:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
 * mandataires/1/etablissements/:mandatairesEtablissementId:
 *   delete:
 *     description: get list of etablissements for a specified mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: paths
 *         name: mandatairesEtablissementId
 *         description: find the etablissement_id of one mandataire
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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


// Change location of this routes
/** @swagger
 * mandataires/1/etablissements:
 *   get:
 *     description: get list of etablissements.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/1/etablissements", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  getEtablissements(mandataire.id)
    .then(etablissements => res.status(200).json(etablissements))
    .catch(error => next(error));
});

module.exports = router;
