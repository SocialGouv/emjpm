const getTi = require("../../../services/getTi");
const uniq = require("lodash.uniq");

async function fetchTribunaux(mesures) {
  const errors = [];
  const tribunaux = [];
  const tribunalSirets = uniq(mesures.map((m) => m.tribunal_siret));
  for (const tribunalSiret of tribunalSirets) {
    const ti = await getTi(tribunalSiret);
    if (!ti) {
      errors.push({
        msg: `siret is not valid`,
        param: "tribunal_siret",
        value: tribunalSiret,
      });
    } else {
      tribunaux.push(ti);
    }
  }
  return { errors, tribunaux };
}

module.exports = fetchTribunaux;
