const { Service, Mandataire } = require("~/models");

const { Mesure } = require("~/models");
const { ServiceAntenne } = require("~/models");

module.exports = async function updateGestionnaireMesuresCounters(
  tableOrType,
  id,
  trx
) {
  let table;
  switch (tableOrType) {
    case "service":
    case "services":
      table = "services";
      break;
    case "mandataire":
    case "mandataires":
      table = "mandataires";
      break;
    default:
      throw new Error(
        "unexpected table '" +
          tableOrType +
          "' in updateGestionnaireMesuresCounters"
      );
  }

  let result;
  switch (table) {
    case "services": {
      const { mesures_in_progress: en_cours, mesures_awaiting: en_attente } =
        await recalculateServiceMesuresCount(id, trx);
      result = {
        en_attente,
        en_cours,
      };
      break;
    }
    case "mandataires": {
      const { mesures_en_cours: en_cours, mesures_en_attente: en_attente } =
        await recalculateMandatairesMesuresCount(id, trx);
      result = {
        en_attente,
        en_cours,
      };
      break;
    }
  }
  return result;
};

async function recalculateMandatairesMesuresCount(mandataireId, trx) {
  const mandataireStates = await Mesure.query(trx)
    .groupBy("status")
    .select("status")
    .count("id")
    .where({ mandataire_id: mandataireId });

  return await Mandataire.query(trx).updateAndFetchById(mandataireId, {
    mesures_en_attente_cached: getCount(mandataireStates, "en_attente"),
    mesures_en_cours_cached: getCount(mandataireStates, "en_cours"),
  });
}

async function recalculateServiceMesuresCount(serviceId, trx) {
  const antennes = await ServiceAntenne.query(trx).where({
    service_id: serviceId,
  });

  for (const { id: antenneId, mesures_max: mesuresMax } of antennes) {
    const antenneStates = await Mesure.query(trx)
      .groupBy("status")
      .select("status")
      .count("id")
      .where({ antenne_id: antenneId });

    const antenneMesuresAwaiting = getCount(antenneStates, "en_attente");
    const antenneMesuresInProgress = getCount(antenneStates, "en_cours");
    await ServiceAntenne.query(trx)
      .findById(antenneId)
      .update({
        dispo_cached:
          mesuresMax - (antenneMesuresAwaiting + antenneMesuresInProgress),
        mesures_awaiting_cached: antenneMesuresAwaiting,
        mesures_in_progress_cached: antenneMesuresInProgress,
      });
  }

  const serviceStates = await Mesure.query(trx)
    .groupBy("status")
    .select("status")
    .count("id")
    .where({ service_id: serviceId });

  return await Service.query(trx).updateAndFetchById(serviceId, {
    mesures_awaiting_cached: getCount(serviceStates, "en_attente"),
    mesures_in_progress_cached: getCount(serviceStates, "en_cours"),
  });
}

function getCount(states, status) {
  const line = states.find((elm) => elm.status === status) || { count: 0 };
  return line.count;
}
