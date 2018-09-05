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
