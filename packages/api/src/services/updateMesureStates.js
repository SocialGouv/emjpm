const { Service } = require("../models/Service");
const { Mandataire } = require("../models/Mandataire");
const { ServiceAntenne } = require("../models/ServiceAntenne");
const { raw } = require("objection");
const { MESURE_PROTECTION_STATUS } = require("@emjpm/core");
const { Mesure } = require("../models/Mesure");

async function updateServiceMesureStates(service_id) {
  const counters = await getMesureStates(null, service_id, null);

  const mesures_in_progress = countMesuresInState(
    counters,
    MESURE_PROTECTION_STATUS.en_cours
  );
  const mesures_awaiting = countMesuresInState(
    counters,
    MESURE_PROTECTION_STATUS.mesures_en_attente
  );

  await Service.query().findById(service_id).patch({
    mesures_awaiting,
    mesures_in_progress,
  });

  const antennes = await ServiceAntenne.query().where({
    service_id,
  });

  for (const antenne of antennes) {
    updateAntenneMesureState(antenne);
  }
}

async function updateAntenneMesureState(antenne) {
  const counters = await getMesureStates(null, antenne.service_id, antenne.id);
  const mesures_in_progress = countMesuresInState(
    counters,
    MESURE_PROTECTION_STATUS.en_cours
  );
  const mesures_awaiting = countMesuresInState(
    counters,
    MESURE_PROTECTION_STATUS.eteinte
  );

  await ServiceAntenne.query().findById(antenne.id).patch({
    mesures_awaiting,
    mesures_in_progress,
  });
}

async function getMesureStates(mandataire_id, service_id, antenne_id) {
  const filter = {};
  if (antenne_id) {
    filter.antenne_id = antenne_id;
  }
  if (mandataire_id) {
    filter.mandataire_id = mandataire_id;
  }
  if (service_id) {
    filter.service_id = service_id;
  }
  return Mesure.query()
    .where(filter)
    .groupBy("status")
    .select(raw("status, count(*)"));
}

async function updateMandataireMesureStates(mandataire_id) {
  const counters = await getMesureStates(mandataire_id, null, null);

  const mesures_en_cours = countMesuresInState(
    counters,
    MESURE_PROTECTION_STATUS.en_cours
  );
  const mesures_en_attente = countMesuresInState(
    counters,
    MESURE_PROTECTION_STATUS.en_attente
  );

  await Mandataire.query().findById(mandataire_id).patch({
    mesures_en_attente,
    mesures_en_cours,
  });
}

function countMesuresInState(mesures, state) {
  const fileredMesures = mesures.find((counter) => counter.status === state);
  return fileredMesures ? fileredMesures.count : 0;
}

module.exports = {
  updateMandataireMesureStates,
  updateServiceMesureStates,
};
