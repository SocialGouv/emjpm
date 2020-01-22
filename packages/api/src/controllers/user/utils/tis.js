const { getTiById } = require("../../../db/queries/tis");

exports.getTisNames = async tis => {
  const getEtablissementByTi = id =>
    getTiById(id).then(json => json.etablissement);
  if (tis) {
    const tiNames = (await Promise.all(tis.map(getEtablissementByTi))).join(
      ", "
    );
    return tiNames;
  }
};
