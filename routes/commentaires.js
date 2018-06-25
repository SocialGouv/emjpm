var express = require("express");
var router = express.Router();
var queries = require("../db/queries");

const { typeRequired } = require("../auth/_helpers");

router.get(
  "/:mandataireId/commentaires",
  typeRequired("ti"),
  async (req, res, next) => {
    const ti = await queries.getTiByUserId(req.user.id);
    queries
      .getAllCommentaires(req.params.mandataireId, ti.id)
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
  async (req, res, next) => {
    // ensure TI can write on this mandataire + add related test
    const ti = await queries.getTiByUserId(req.user.id);
    const isMandataireInTi = await queries.isMandataireInTi(
      req.params.mandataireId,
      ti.id
    );
    if (!isMandataireInTi) {
      return next(new Error(401));
    }
    queries
      .addCommentaire({
        co_comment: req.body.co_comment,
        mandataire_id: req.params.mandataireId,
        ti_id: ti.id
      })
      .then(function(commentaireID) {
        return queries.getAllCommentaires(req.params.mandataireId, ti.id);
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

router.delete(
  "/:mandataireId/commentaires/:commentaireId",
  typeRequired("ti"),
  async (req, res, next) => {
    // secu : ensure TI can write on this mandataire + add related test
    const ti = await queries.getTiByUserId(req.user.id);
    queries
      .deleteCommentaire(req.params.commentaireId)
      .then(function(commentaireID) {
        return queries.getAllCommentaires(req.params.mandataireId, ti.id);
      })
      .then(function(commentaires) {
        res.status(200).json(commentaires);
      })
      .catch(function(error) {
        next(error);
      });
  }
);

// router.delete("/", function(req, res, next) {
//   queries
//     .getSingle(req.body.co_id)
//     .then(function(show) {
//       queries
//         .deleteItem(req.body.co_id)
//         .then(function() {
//           res.status(200).json(show);
//         })
//         .catch(function(error) {
//           next(error);
//         });
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });
// router.get("/", function(req, res, next) {
//   res.render("commentaires", { title: "Express" });
// });

// router.post("/index", function(req, res, next) {
//   console.log(res);
//   queries
//     .getAllCommentaire(req.body.mandataire_id, req.body.ti_id)
//     .then(function(commentaires) {
//       res.status(200).json(commentaires);
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });

// router.get("/:id", function(req, res, next) {
//   queries
//     .getSingleCommentaire(req.params.id)
//     .then(function(commentaire) {
//       res.status(200).json(commentaire);
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });

// router.post("/", function(req, res, next) {
//   queries
//     .addCommentaire(req.body)
//     .then(function(commentaireID) {
//       return queries.getSingleCommentaire(commentaireID);
//     })
//     .then(function(commentaire) {
//       res.status(200).json(commentaire);
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });

// router.put("/", function(req, res, next) {
//   queries
//     .updateCommentaire(req.body.co_id, req.body)
//     .then(function() {
//       return queries.getSingle(req.body.id);
//     })
//     .then(function(commentaire) {
//       res.status(200).json(commentaire);
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });

module.exports = router;
