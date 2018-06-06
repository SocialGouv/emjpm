const express = require("express");

const router = express.Router();
const queries = require("../db/queries");
const { loginRequired } = require("../auth/_helpers");

router.put(
  "/:mandataireId/mesures/:mesureId",
  loginRequired,
  async (req, res, next) => {
    const ti = await queries.getMandataireByUserId(req.user.id);
    queries
      .updateMesure(req.params.mesureId, req.body)
      .then(function() {
        return queries.getAllMesures(ti.id);
      })
      .then(function(mesures) {
        res.status(200).json(mesures);
      })
      .catch(function(error) {
        next(error);
      });
  }
);

router.post("/:mandataireId/mesures", loginRequired, async (req, res, next) => {
  // secu : ensure TI can write on this mandataire + add related test
  const ti = await queries.getMandataireByUserId(req.user.id);
  queries
    .addMesure({
      ...req.body,
      mandataire_id: ti.id
    })
    .then(function() {
      return queries.getAllMesures(ti.id);
    })
    .then(function(mesures) {
      res.status(200).json(mesures);
    })
    .catch(function(error) {
      next(error);
    });
});

router.get("/:mandataireId/mesures", loginRequired, async (req, res, next) => {
  const ti = await queries.getMandataireByUserId(req.user.id);
  queries
    .getAllMesures(ti.id)
    .then(function(mesures) {
      res.status(200).json(mesures);
    })
    .catch(function(error) {
      next(error);
    });
});

router.get(
  "/:mandataireId/mesures/Eteinte",
  loginRequired,
  async (req, res, next) => {
    const ti = await queries.getMandataireByUserId(req.user.id);
    queries
      .getAllMesuresEteinte(ti.id)
      .then(function(mesures) {
        res.status(200).json(mesures);
      })
      .catch(function(error) {
        next(error);
      });
  }
);
module.exports = router;
