var express = require("express");
var router = express.Router();

const { loginRequired } = require("../auth/_helpers");

const {
  getAllTisByMandataire,
  addMandataireTis,
  deleteMandataireTis,
  getTis
} = require("../db/queries/tis");

const { getMandataireByUserId } = require("../db/queries/mandataires");

// TODO:  Security for mandataire

/** @swagger
 * /mandataires/:mandataireId/tis-by-mandataire:
 *   get:
 *     tags:
 *       - tis
 *     description: get Tis by mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: paths
 *         name: mandataireId
 *         description: mandataire id.
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

router.get(
  "/:mandataireId/tis-by-mandataire",
  loginRequired,
  async (req, res, next) => {
    getAllTisByMandataire(req.params.mandataireId)
      .then(tis => res.status(200).json(tis))
      .catch(error => next(error));
  }
);

/** @swagger
 * /mandataires/1/tis:
 *   post:
 *     tags:
 *       - tis
 *     description: add a Ti to mandataire
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ti_id:
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
router.post("/1/tis", loginRequired, async (req, res, next) => {
  // secu : ensure TI can write on this mandataire + add related test
  const mandataire = await getMandataireByUserId(req.user.id);
  addMandataireTis(req.body.ti_id, mandataire.id)
    .then(() => getAllTisByMandataire(mandataire.id))
    .then(tis => res.status(200).json(tis))
    .catch(error => next(error));
});

// TODO: ensure we can delete this

/** @swagger
 * /mandataires/1/tis/:tiId:
 *   delete:
 *     tags:
 *       - tis
 *     description: delete a Ti for specific mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: tiId
 *         description: find a specific mandataire
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
router.delete("/1/tis/:tiId", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  deleteMandataireTis(req.params.tiId, mandataire.id)
    .then(() => getAllTisByMandataire(mandataire.id))
    .then(tis => res.status(200).json(tis))
    .catch(error => {
      console.log(error);
      next(error);
    });
});

// ToDo : merge with /:mandataireId/tis-by-mandataire
/** @swagger
 * /mandataires/1/tis:
 *   get:
 *     tags:
 *       - tis
 *     description: get Tis for specific mandataire
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
router.get("/1/tis", loginRequired, async (req, res, next) => {
  const mandataire = await getMandataireByUserId(req.user.id);
  getAllTisByMandataire(mandataire.id)
    .then(tis => res.status(200).json(tis))
    .catch(error => next(error));
});

/** @swagger
 * /mandataires/tis:
 *   get:
 *     tags:
 *       - tis
 *     description: get all Tis
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
router.get("/tis", loginRequired, async (req, res, next) => {
  getTis()
    .then(tis => res.status(200).json(tis))
    .catch(error => next(error));
});

module.exports = router;
