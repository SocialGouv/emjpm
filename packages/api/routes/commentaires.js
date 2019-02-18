var express = require("express");
var router = express.Router();

const { typeRequired } = require("../auth/_helpers");

const {
  getAllCommentaires,
  addCommentaire,
  deleteCommentaire,
  isMandataireInTi
} = require("../db/queries/commentaires");

const { getTiByUserId } = require("../db/queries/tis");

/** @swagger
 * /mandataires/1/commentaires:
 *   get:
 *     tags:
 *       - commentaire
 *     description: get all commentaires for a specific mandataire
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return all commentaires of one mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
  "/:mandataireId/commentaires",
  typeRequired("ti"),
  async (req, res, next) => {
    const ti = await getTiByUserId(req.user.id);
    if (!ti) {
      next(new Error("500"));
    }
    getAllCommentaires(req.params.mandataireId, ti.id)
      .then(function(commentaires) {
        res.status(200).json(commentaires);
      })
      .catch(function(error) {
        next(error);
      });
  }
);

/** @swagger
 * /mandataires/:mandataireId/commentaires:
 *   post:
 *     tags:
 *       - commentaire
 *     description: add a commentaire for a specific mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: mandataireId
 *         description: mandataire id
 *         required: true
 *         schema:
 *           type: object
 *     requestBody:
 *       description: A JSON object containing commentaire
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Return all commentaires of one mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post(
  "/:mandataireId/commentaires",
  typeRequired("ti"),
  async (req, res, next) => {
    // ensure TI can write on this mandataire + add related test
    const ti = await getTiByUserId(req.user.id);
    if (!ti) {
      res.status(401).json();
      return;
    }
    const isAllowed = await isMandataireInTi(req.params.mandataireId, ti.id);
    if (!isAllowed) {
      res.status(401).json();
      return;
    }
    // skip when empty call
    if (req.body.comment) {
      await addCommentaire({
        comment: req.body.comment,
        mandataire_id: req.params.mandataireId,
        ti_id: ti.id
      });
    }
    const comments = await getAllCommentaires(req.params.mandataireId, ti.id);
    res.status(200).json(comments);
  }
);

/** @swagger
 * /mandataires/:mandataireId/commentaires/:commentaireId:
 *   delete:
 *     tags:
 *       - commentaire
 *     description: delete a commentaire for specific mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: mandataireId
 *         description: mandataire id
 *         required: true
 *         schema:
 *           type: object
 *       - in: path
 *         name: commentaireId
 *         description: commentaire id
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Return all commentaires of one mandataire
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.delete(
  "/:mandataireId/commentaires/:commentaireId",
  typeRequired("ti"),
  async (req, res, next) => {
    // secu : ensure TI can write on this mandataire + add related test
    const ti = await getTiByUserId(req.user.id);
    if (!ti) {
      res.status(401).json();
      return;
    }
    const isAllowed = await isMandataireInTi(req.params.mandataireId, ti.id);
    if (!isAllowed) {
      res.status(401).json();
      return;
    }
    deleteCommentaire({
      id: req.params.commentaireId,
      ti_id: ti.id
    })
      .then(function(commentaireID) {
        return getAllCommentaires(req.params.mandataireId, ti.id);
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
