const express = require("express");
const router = express.Router();

const { loginRequired } = require("../auth/_helpers");

const {
  getAllAntennesByMandataireId,
  addAntenne,
  deleteAntenne
} = require("../db/queries/serviceAntennes");

const { getMandataireByUserId } = require("../db/queries/mandataires");

/** @swagger
 * /mandataires/1/antennes:
 *   get:
 *     tags:
 *       - serviceAntenne
 *     description: get list of antennes for a specific mandataire
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
router.get("/:mandataireId/antennes", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  getAllAntennesByMandataireId(mandataire.id)
    .then(function(commentaires) {
      res.status(200).json(commentaires);
    })
    .catch(function(error) {
      next(error);
    });
});

/** @swagger
 * /mandataires/1/antennes:
 *   post:
 *     tags:
 *       - serviceAntenne
 *     description: post a new antenne for specific mandataire
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: A JSON object containing antenne
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
 *               items:
 *                 type: object
 */
router.post(
  "/:mandataireId/antennes",
  loginRequired,
  async (req, res, next) => {
    // secu : ensure TI can write on this mandataire + add related test
    const mandataire = await getMandataireByUserId(req.user.id);
    addAntenne({
      ...req.body,
      mandataire_id: mandataire.id
    })
      .then(function() {
        return getAllAntennesByMandataireId(ti.id);
      })
      .then(function(commentaires) {
        res.status(200).json(commentaires);
      })
      .catch(function(error) {
        console.log(error);
        next(error);
      });
  }
);

/** @swagger
 * /mandataires/1/antennes:
 *   delete:
 *     tags:
 *       - serviceAntenne
 *     description: delete an antenne for specific mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: paths
 *         name: antenneId
 *         description: id of the antenne
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
router.delete(
  "/:mandataireId/antennes/:antenneId",
  loginRequired,
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    deleteAntenne({
      id: req.params.antenneId,
      mandataire_id: mandataire.id
    })
      .then(function() {
        return getAllAntennesByMandataireId(mandataire.id);
      })
      .then(function(commentaires) {
        res.status(200).json(commentaires);
      })
      .catch(function(error) {
        next(error);
      });
  }
);
module.exports = router;
