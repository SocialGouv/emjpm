var express = require("express");
var router = express.Router();

const { typeRequired } = require("../auth/_helpers");

const {
  getAllCommentaires,
  addCommentaire,
  deleteCommentaire,
  isMandataireInTi
} = require("../db/queries/commentaires");

const {getTiByUserId} = require("../db/queries/tis")

/** @swagger
 * /mandataires/1/commentaires:
 *   get:
 *     description: get all commentaires for a specific mandataire
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
 *     description: post a commentaire for a specific mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: mandataireId
 *         description: find a specific mandataire
 *         required: true
 *         schema:
 *           type: object
 *     requestBodies:
 *     ActiveMandataireBody:
 *       description: A JSON object containing commentaire
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: varchar
 *                 required: true
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post(
  "/:mandataireId/commentaires",
  typeRequired("ti"),
  (req, res, next) => {
    // ensure TI can write on this mandataire + add related test
    getTiByUserId(req.user.id).then(ti => {
      if (!ti) {
        next(new Error("500"));
        return;
      }
      return isMandataireInTi(req.params.mandataireId, ti.id)
        .then(isMandataireInTi => {
          if (!isMandataireInTi) {
            return next(new Error(401));
          }
          addCommentaire({
            comment: req.body.comment,
            mandataire_id: req.params.mandataireId,
            ti_id: ti.id
          })
            .then(function(commentaireID) {
              return getAllCommentaires(req.params.mandataireId, ti.id);
            })
            .then(function(commentaires) {
              res.status(200).json(commentaires);
            })
            .catch(function(error) {
              console.log(error);
              next(error);
            });
        });
    });
  }
);

/** @swagger
 * /mandataires/:mandataireId/commentaires/:commentaireId:
 *   delete:
 *     description: delete a commentaire for specific mandataire
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: mandataireId
 *         description: find a specific mandataire by id
 *         required: true
 *         schema:
 *           type: object
 *       - in: path
 *         name: commentaireId
 *         description: find a specific commentaire by id
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
  "/:mandataireId/commentaires/:commentaireId",
  typeRequired("ti"),
  async (req, res, next) => {
    // secu : ensure TI can write on this mandataire + add related test
    const ti = await getTiByUserId(req.user.id);
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
