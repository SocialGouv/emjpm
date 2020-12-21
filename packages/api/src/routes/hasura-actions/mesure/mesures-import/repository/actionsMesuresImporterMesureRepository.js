const { ServiceAntenne } = require("~/models");
const { Tis } = require("~/models");

async function findTribunalBySiret(siret, cache) {
  let ti = cache[siret];
  if (!ti) {
    ti = await Tis.query().findOne({
      siret,
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
      name: antenne_name,
      service_id,
    });
  }
  if (antenne) {
    cache[antenne_name] = antenne;
  }
  return antenne;
}

const actionsMesuresImporterMesureRepository = {
  findAntenne,
  findTribunalBySiret,
};

module.exports = actionsMesuresImporterMesureRepository;
