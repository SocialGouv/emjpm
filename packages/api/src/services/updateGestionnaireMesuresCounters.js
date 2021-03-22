const { Service, Mandataire } = require("~/models");

const { Mesure } = require("~/models");
const { ServiceAntenne } = require("~/models");

module.exports = async function updateGestionnaireMesuresCounters(
  tableOrType,
  id
) {
  let result;
  switch (tableOrType) {
    case "services": {
      const {
        mesures_in_progress: en_cours,
        mesures_awaiting: en_attente,
      } = await recalculateServiceMesuresCount(id);
      result = {
        en_attente,
        en_cours,
      };
      break;
    }
    case "mandataires": {
      const {
        mesures_en_cours: en_cours,
        mesures_en_attente: en_attente,
      } = await recalculateMandatairesMesuresCount(id);
      result = {
        en_attente,
        en_cours,
      };
      break;
    }
    default:
      throw new Error(
        "unexpected table '" +
          tableOrType +
          "' in updateGestionnaireMesuresCounters"
      );
  }
  return result;
};

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
