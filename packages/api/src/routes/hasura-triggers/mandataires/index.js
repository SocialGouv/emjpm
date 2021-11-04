const express = require("express");

const hasuraActionErrorHandler = require("~/middlewares/hasura-error-handler");
const updateGestionnaireMesuresCounters = require("~/services/updateGestionnaireMesuresCounters");

const router = express.Router();

router.post(
  "/recalculate-mesures",
  async (req, res, next) => {
    const { data } = req.body.event;
    const mesure = data.new || data.old;
    const serviceId = mesure.service_id;
    const mandataireId = mesure.mandataire_id;

    let result;
    if (serviceId) {
      result = await updateGestionnaireMesuresCounters("services", serviceId);
    }
    if (mandataireId) {
      result = await updateGestionnaireMesuresCounters(
        "mandataires",
        mandataireId
      );
    }
    try {
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Erreur durant le comptage des mesures")
);

module.exports = router;
