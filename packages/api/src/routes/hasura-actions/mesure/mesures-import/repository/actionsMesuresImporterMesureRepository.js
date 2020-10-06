const { ServiceAntenne } = require("../../../../../models/ServiceAntenne");
const { Tis } = require("../../../../../models/Tis");

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
      service_id,
      name: antenne_name,
    });
  }
  if (antenne) {
    cache[antenne_name] = antenne;
  }
  return antenne;
}

const actionsMesuresImporterMesureRepository = {
  findTribunalBySiret,
  findAntenne,
};

module.exports = actionsMesuresImporterMesureRepository;
