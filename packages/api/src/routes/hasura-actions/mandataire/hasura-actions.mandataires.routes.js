const express = require("express");
const { Mandataire } = require("../../../models/Mandataire");
const { Mesure } = require("../../../models/Mesure");
const { Service } = require("../../../models/Service");
const { ServiceAntenne } = require("../../../models/ServiceAntenne");

const hasuraActionErrorHandler = require("../../../middlewares/hasura-error-handler");

const router = express.Router();

router.post(
  "/calculate-mesures",
  async (req, res, next) => {
    const { serviceId, mandataireId } = req.body.input;
    let updatedRows = {};
    if (serviceId) {
      updatedRows = await recalculateServiceMesuresCount(serviceId);
    }
    if (mandataireId) {
      updatedRows = await recalculateMandatairesMesuresCount(serviceId);
    }
    try {
      return res.status(200).json({
        updatedRows,
        success: true,
      });
    } catch (err) {
      return next(err);
    }
  },
  hasuraActionErrorHandler("Unexpected error processing file")
);

module.exports = router;

async function recalculateMandatairesMesuresCount(mandataireId) {
  const mandataireStates = await Mesure.query()
    .groupBy("status")
    .select("status")
    .count("id")
    .where({ mandataire_id: mandataireId });

  return await Mandataire.query()
    .findById(mandataireId)
    .update({
      mesures_en_cours: getCount(mandataireStates, "en_cours"),
      mesures_en_attente: getCount(mandataireStates, "en_attente"),
    });
}

async function recalculateServiceMesuresCount(serviceId) {
  const serviceStates = await Mesure.query()
    .groupBy("status")
    .select("status")
    .count("id")
    .where({ service_id: serviceId });

  const antennes = await ServiceAntenne.query().where({
    service_id: serviceId,
  });

  for (const { id: antenneId } of antennes) {
    const antenneStates = await Mesure.query()
      .groupBy("status")
      .select("status")
      .count("id")
      .where({ antenne_id: antenneId });
    await ServiceAntenne.query()
      .findById(antenneId)
      .update({
        mesures_in_progress: getCount(antenneStates, "en_cours"),
        mesures_awaiting: getCount(antenneStates, "en_attente"),
      });
  }

  return await Service.query()
    .findById(serviceId)
    .update({
      mesures_in_progress: getCount(serviceStates, "en_cours"),
      mesures_awaiting: getCount(serviceStates, "en_attente"),
    });
}

function getCount(states, status) {
  const line = states.find((elm) => elm.status === status) || {};
  return line.count;
}
