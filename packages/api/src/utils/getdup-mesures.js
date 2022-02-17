const { normalizeNumeroRG } = require("~/utils/numero-rg");

module.exports = function getdupMesures(rows) {
  const hashes = rows.map(({ numero_rg, tribunal_siret, ti_id }) =>
    [normalizeNumeroRG(numero_rg), tribunal_siret || ti_id].join(".")
  );
  const all = new Set();
  const doublons = new Set();
  for (const hash of hashes) {
    if (all.has(hash)) {
      doublons.add(hash);
    } else {
      all.add(hash);
    }
  }
  return Array.from(doublons);
};
