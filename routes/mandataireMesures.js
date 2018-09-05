const express = require("express");

const router = express.Router();
const { loginRequired, typeRequired } = require("../auth/_helpers");

const {
  updateCountMesures,
  updateDateMesureUpdate,
  getMandataireByUserId
} = require("../db/queries/mandataires");

const { getTiByUserId } = require("../db/queries/tis");

const {
  updateMesure,
  getAllMesuresEteinte,
  getAllMesuresAttente,
  getAllMesures,
  addMesure
} = require("../db/queries/mesures");

// update mesure
router.put(
  "/:mandataireId/mesures/:mesureId",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    updateMesure(
      {
        id: req.params.mesureId,
        // ⚠️ ensure to override a mandataire only
        mandataire_id: mandataire.id
      },
      req.body
    )
      //.then(() => queries.getAllMesures(mandataire.id))
      // todo : trigger/view
      //.then(() => updateDateMesureUpdate(mandataire.id))
      // todo : trigger/view
      .then(() => updateCountMesures(mandataire.id))
      .then(() => getAllMesures(mandataire.id))
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);

// create mesure
router.post(
  "/:mandataireId/mesures",
  typeRequired("individuel", "prepose", "ti"),
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    const ti = await getTiByUserId(req.user.id);
    const body = {
      ...req.body
    };
    if (req.user.type === "individuel" || req.user.type === "prepose") {
      body["mandataire_id"] = mandataire.id;
    }
    if (req.user.type === "ti") {
      body["ti_id"] = ti.id;
      addMesure(body)
        .then(mesures => res.status(200).json({ success: true }))
        .catch(error => {
          console.log(error);
          next(error);
        });
    } else {
      addMesure(body)
        .then(() => getAllMesures(mandataire.id))
        .then(mesures => res.status(200).json(mesures))
        .then(() => updateCountMesures(mandataire.id))
        // todo : trigger/view
        .catch(error => {
          console.log(error);
          next(error);
        });
    }
  }
);

router.post(
  "/:mandataireId/mesure-reservation",
  typeRequired("ti"),
  async (req, res, next) => {
    addMesure({
      ...req.body
    })
      .then(mesures => res.status(200).json(mesures))
      .catch(error => {
        console.log(error);
        next(error);
      });
  }
);

router.get(
  "/:mandataireId/mesures",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    getAllMesures(mandataire.id)
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);

router.get(
  "/:mandataireId/mesuresForMaps",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await queries.getMandataireByUserId(req.user.id);
    const mesures = await getMesuresMap(mandataire.id);
    res.status(200).json(mesures);
    next();
  }
);

router.get(
  "/:mandataireId/mesures/attente",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    getAllMesuresAttente(mandataire.id)
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);

router.get(
  "/:mandataireId/mesures/Eteinte",
  typeRequired("individuel", "prepose"),
  async (req, res, next) => {
    const mandataire = await getMandataireByUserId(req.user.id);
    getAllMesuresEteinte(mandataire.id)
      .then(mesures => res.status(200).json(mesures))
      .catch(error => next(error));
  }
);
module.exports = router;
