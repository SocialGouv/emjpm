const express = require("express");

const router = express.Router();
const queries = require("../db/queries");

router.get("/:id", function(req, res, next) {
  console.log(req.user);

  queries
    .getSingle(req.params.id)
    .then(function(mandataire) {
      res.status(200).json(mandataire);
    })
    .catch(function(error) {
      next(error);
    });
});

router.put("/:id", function(req, res, next) {
  queries
    .update(req.params.id, req.body)
    .then(function() {
      return queries.getSingle(req.params.id);
    })
    .then(function(mandataire) {
      res.status(200).json(mandataire);
    })
    .catch(function(error) {
      next(error);
    });
});

router.get("/", function(req, res, next) {
  //  console.log(req.user);
  const ti_id = 1;
  queries
    .getAllMandataires(ti_id)
    .then(function(mandataires) {
      res.status(200).json(mandataires);
    })
    .catch(function(error) {
      next(error);
    });
});

router.post("/", function(req, res, next) {
  queries
    .add(req.body)
    .then(function(mandataireID) {
      return queries.getSingle(mandataireID);
    })
    .then(function(mandataire) {
      res.status(200).json(mandataire);
    })
    .catch(function(error) {
      next(error);
    });
});

module.exports = router;
