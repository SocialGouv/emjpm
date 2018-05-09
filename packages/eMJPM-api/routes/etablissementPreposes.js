var express = require("express");
var router = express.Router();
var queries = require("../db/queries");

router.get("/:mandataireId/etablissements", async (req, res, next) => {
  const ti = await queries.getMandataireByUserId(req.user.id);
  queries
    .getAllEtablissement(ti.id)
    .then(function(commentaires) {
      res.status(200).json(commentaires);
    })
    .catch(function(error) {
      next(error);
    });
});

router.post("/:mandataireId/etablissements", async (req, res, next) => {
  // secu : ensure TI can write on this mandataire + add related test
  const ti = await queries.getMandataireByUserId(req.user.id);
  queries
    .addEtablissement({
      ...req.body,
      mandataire_id: ti.id
    })
    .then(function(commentaireID) {
      return queries.getAllEtablissement(ti.id);
    })
    .then(function(commentaires) {
      res.status(200).json(commentaires);
    })
    .catch(function(error) {
      console.log(error);
      next(error);
    });
});

router.put("/:mandataireId/etablissements/:etablissementId", async (req, res, next) => {
  const ti = await queries.getMandataireByUserId(req.user.id);
  queries
    .updateEtablissement(req.params.etablissementId, req.body)
    .then(function() {
      return queries.getAllEtablissement(ti.id);
    })
    .then(function(commentaire) {
      res.status(200).json(commentaire);
    })
    .catch(function(error) {
      next(error);
    });
});

router.delete("/:mandataireId/etablissements/:etablissementId", async (req, res, next) => {
  const ti = await queries.getMandataireByUserId(req.user.id);
  queries
    .deleteEtablissement(req.params.etablissementId)
    .then(function(commentaireID) {
      return queries.getAllEtablissement(ti.id);
    })
    .then(function(commentaires) {
      res.status(200).json(commentaires);
    })
    .catch(function(error) {
      next(error);
    });
});

module.exports = router;