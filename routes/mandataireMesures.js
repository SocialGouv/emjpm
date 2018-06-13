const express = require("express");

const router = express.Router();
const queries = require("../db/queries");
const { loginRequired, typeRequired } = require("../auth/_helpers");

router.put(
  "/:mandataireId/mesures/:mesureId",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    queries
      .updateMesure(
        {
          id: req.params.mesureId,
          // ⚠️ ensure to override a mandataire only
          mandataire_id: mandataire.id
        },
        req.body
      )
      .then(() => queries.getAllMesures(mandataire.id))
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);

router.post(
  "/:mandataireId/mesures",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    queries
      .addMesure({
        ...req.body,
        mandataire_id: mandataire.id
      })
      .then(() => queries.getAllMesures(mandataire.id))
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);

router.get(
  "/:mandataireId/mesures",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    queries
      .getAllMesures(mandataire.id)
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);

router.get(
  "/:mandataireId/mesures/Eteinte",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    queries
      .getAllMesuresEteinte(mandataire.id)
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);
module.exports = router;
