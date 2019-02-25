const express = require("express");
const createError = require("http-errors");
const router = express.Router();

const { typeRequired } = require("../auth/_helpers");

const {
  getAllCommentaires,
  addCommentaire,
  deleteCommentaire
} = require("../db/queries/commentaires");

const { isMandataireInTi } = require("../db/queries/mandataires");

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
    try {
      const ti = await getTiByUserId(req.user.id);
      if (!ti) {
        throw createError.Unauthorized(`TI not found`);
      }
      const isAllowed = await isMandataireInTi(req.params.mandataireId, ti.id);
      if (!isAllowed) {
        throw createError.Unauthorized(`Mandataire not found in current TI`);
      }
      const commentaires = await getAllCommentaires(
        req.params.mandataireId,
        ti.id
      );
      res.status(200).json(commentaires);
    } catch (err) {
      next(err);
    }
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
    try {
      const ti = await getTiByUserId(req.user.id);
      if (!ti) {
        throw createError.Unauthorized(`TI not found`);
      }
      const isAllowed = await isMandataireInTi(req.params.mandataireId, ti.id);
      if (!isAllowed) {
        throw createError.Unauthorized(`Mandataire not found in current TI`);
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
    } catch (err) {
      next(err);
    }
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
    try {
      const ti = await getTiByUserId(req.user.id);
      if (!ti) {
        throw createError.Unauthorized(`TI not found`);
      }
      const isAllowed = await isMandataireInTi(req.params.mandataireId, ti.id);
      if (!isAllowed) {
        throw createError.Unauthorized(`Mandataire not found in current TI`);
      }
      await deleteCommentaire({
        id: req.params.commentaireId,
        ti_id: ti.id
      });
      const commentaires = await getAllCommentaires(
        req.params.mandataireId,
        ti.id
      );
      res.status(200).json(commentaires);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
