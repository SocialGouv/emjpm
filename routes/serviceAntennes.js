const express = require("express");
const router = express.Router();

const { loginRequired } = require("../auth/_helpers");

const {
  getAllAntennes,
  addAntenne,
  deleteAntenne
} = require("../db/queries/serviceAntennes");

const { getMandataireByUserId } = require("../db/queries/mandataires");

/** @swagger
 * /mandataires/1/antennes:
 *   get:
 *     description: get list of antennes for a specific mandataire
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/:mandataireId/antennes", loginRequired, async (req, res, next) => {
  const ti = await getMandataireByUserId(req.user.id);
  getAllAntennes(ti.id)
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
 *     description: post a new antenne for specific mandataire
 *     produces:
 *       - application/json
 *     requestBodies:
 *     ActiveMandataireBody:
 *       description: A JSON object containing etablissement id
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etablissement_id:
 *                 type: integer
 *                 required: true
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post(
  "/:mandataireId/antennes",
  loginRequired,
  async (req, res, next) => {
    // secu : ensure TI can write on this mandataire + add related test
    const ti = await getMandataireByUserId(req.user.id);
    addAntenne({
      ...req.body,
      mandataire_id: ti.id
    })
      .then(function(commentaireID) {
        return getAllAntennes(ti.id);
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
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
      .then(function(commentaireID) {
        return getAllAntennes(mandataire.id);
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
