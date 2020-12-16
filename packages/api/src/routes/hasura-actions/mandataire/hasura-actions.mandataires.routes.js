const express = require("express");
const { Mandataire } = require("~/models/Mandataire");
const { Mesure } = require("~/models/Mesure");
const { Service } = require("~/models/Service");
const { ServiceAntenne } = require("~/models/ServiceAntenne");

const hasuraActionErrorHandler = require("~/middlewares/hasura-error-handler");
const { User } = require("~/models/User");
const { isMandataire } = require("@emjpm/core");

const router = express.Router();

router.post("/stats", async (req, res) => {
  const { userId } = req.body.input;

  const user = await User.query().findById(userId);
  const type = isMandataire(user) ? "mandataire" : "service";
  const serviceOrMandataire = await user.$relatedQuery(type);

  const natureStats = await Mesure.query()
    .where({ [`${type}_id`]: serviceOrMandataire.id })
    .andWhere({ status: "en_cours" })
    .groupBy("nature_mesure")
    .select("nature_mesure")
    .count();

  const statistics = {
    natureStatistics: natureStats.map((stat) => ({
      name: stat.nature_mesure,
      value: stat.count,
    })),
  };

  return res.json(statistics);
});

router.post(
  "/calculate-mesures",
  async (req, res, next) => {
    const { serviceId, mandataireId } = req.body.input;
    let result;
    if (serviceId) {
      const {
        mesures_in_progress: en_cours,
        mesures_awaiting: en_attente,
      } = await recalculateServiceMesuresCount(serviceId);
      result = {
        en_attente,
        en_cours,
      };
    }
    if (mandataireId) {
      const {
        mesures_en_cours: en_cours,
        mesures_en_attente: en_attente,
      } = await recalculateMandatairesMesuresCount(mandataireId);
      result = {
        en_attente,
        en_cours,
      };
    }
    try {
      return res.status(200).json(result);
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

  return await Mandataire.query().updateAndFetchById(mandataireId, {
    mesures_en_attente: getCount(mandataireStates, "en_attente"),
    mesures_en_cours: getCount(mandataireStates, "en_cours"),
  });
}

async function recalculateServiceMesuresCount(serviceId) {
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
        mesures_awaiting: getCount(antenneStates, "en_attente"),
        mesures_in_progress: getCount(antenneStates, "en_cours"),
      });
  }

  const serviceStates = await Mesure.query()
    .groupBy("status")
    .select("status")
    .count("id")
    .where({ service_id: serviceId });

  return await Service.query().updateAndFetchById(serviceId, {
    mesures_awaiting: getCount(serviceStates, "en_attente"),
    mesures_in_progress: getCount(serviceStates, "en_cours"),
  });
}

function getCount(states, status) {
  const line = states.find((elm) => elm.status === status) || { count: 0 };
  return line.count;
}
