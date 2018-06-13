var express = require("express");
var router = express.Router();
var queries = require("../db/queries");

const { loginRequired } = require("../auth/_helpers");

router.get("/1/etablissements", loginRequired, async (req, res, next) => {
  const mandataire = await queries.getMandataireByUserId(req.user.id);
  queries
    .getAllEtablissement(mandataire.id)
    .then(commentaires => res.status(200).json(commentaires))
    .catch(error => next(error));
});

router.post("/1/etablissements", loginRequired, async (req, res, next) => {
  // secu : ensure TI can write on this mandataire + add related test
  const mandataire = await queries.getMandataireByUserId(req.user.id);
  queries
    .addEtablissement({
      ...req.body,
      mandataire_id: mandataire.id
    })
    .then(commentaireID => queries.getAllEtablissement(mandataire.id))
    .then(commentaires => res.status(200).json(commentaires))
    .catch(error => next(error));
});

// todo : ensure user can edit this entry
router.put(
  "/1/etablissements/:etablissementId",
  loginRequired,
  async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    queries
      .updateEtablissement(req.params.etablissementId, req.body)
      .then(() => queries.getAllEtablissement(mandataire.id))
      .then(commentaire => res.status(200).json(commentaire))
      .catch(function(error) {
        next(error);
      });
  }
);

// todo : ensure user can delete this entry
router.delete(
  "/1/etablissements/:etablissementId",
  loginRequired,
  async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    queries
      .deleteEtablissement(req.params.etablissementId)
      .then(() => queries.getAllEtablissement(mandataire.id))
      .then(commentaires => res.status(200).json(commentaires))
      .catch(error => {
        console.log(error);
        next(error);
      });
  }
);

module.exports = router;
