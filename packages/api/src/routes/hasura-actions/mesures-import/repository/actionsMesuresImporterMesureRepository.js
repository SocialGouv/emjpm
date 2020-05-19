const { Service } = require("../../../../models/Service");
const { Mandataire } = require("../../../../models/Mandataire");
const { raw } = require("objection");
const { Mesure } = require("../../../../models/Mesure");
const { ServiceAntenne } = require("../../../../models/ServiceAntenne");
const { Tis } = require("../../../../models/Tis");

const getMesureStates = async (mandataire_id, service_id, antenne_id) => {
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
};

const updateAntenneMesureState = async antenne => {
  const counters = await getMesureStates(null, antenne.service_id, antenne.id);
  const mesures_in_progress = countMesuresInState(counters, "Mesure en cours");
  const mesures_awaiting = countMesuresInState(counters, "Mesure en attente");

  await ServiceAntenne.query()
    .findById(antenne.id)
    .patch({
      mesures_in_progress,
      mesures_awaiting
    });
};
const updateServiceMesureStates = async service_id => {
  const counters = await getMesureStates(null, service_id, null);

  const mesures_in_progress = countMesuresInState(counters, "Mesure en cours");
  const mesures_awaiting = countMesuresInState(counters, "Mesure en attente");

  await Service.query()
    .findById(service_id)
    .patch({
      mesures_in_progress,
      mesures_awaiting
    });

  const antennes = await ServiceAntenne.query().where({
    service_id
  });

  for (const antenne of antennes) {
    updateAntenneMesureState(antenne);
  }
};
const updateMandataireMesureStates = async mandataire_id => {
  const counters = await getMesureStates(mandataire_id, null, null);

  const mesures_en_cours = countMesuresInState(counters, "Mesure en cours");
  const mesures_en_attente = countMesuresInState(counters, "Mesure en attente");

  await Mandataire.query()
    .findById(mandataire_id)
    .patch({
      mesures_en_cours,
      mesures_en_attente
    });
};

const countMesuresInState = (mesures, state) => {
  const fileredMesures = mesures.find(counter => counter.status === state);
  return fileredMesures ? fileredMesures.count : 0;
};

async function findTribunalBySiret(siret, cache) {
  let ti = cache[siret];
  if (!ti) {
    ti = await Tis.query().findOne({
      siret
    });
  }
  if (ti) {
    cache[siret] = ti;
  }
  return ti;
}

async function findAntenne({ service_id, antenne_name }, cache) {
  let antenne = cache[antenne_name];
  if (!antenne) {
    antenne = await ServiceAntenne.query().findOne({
      service_id,
      name: antenne_name
    });
  }
  if (antenne) {
    cache[antenne_name] = antenne;
  }
  return antenne;
}

const actionsMesuresImporterMesureRepository = {
  getMesureStates,
  updateServiceMesureStates,
  updateMandataireMesureStates,
  findTribunalBySiret,
  findAntenne
};

module.exports = actionsMesuresImporterMesureRepository;
