//1

const knex = require("../knex.js");

const getAllTisByMandataire = (mandataireId) =>
  knex("mandataire_tis")
    .distinct("mandataire_tis.ti_id")
    .select("tis.id", "tis.etablissement", "mandataire_tis.ti_id")
    .innerJoin("tis", "mandataire_tis.ti_id", "tis.id")
    .where({
      mandataire_id: parseInt(mandataireId),
    });

const getTisNames = async (tis) => {
  const getEtablissementByTi = (id) =>
    getTiById(id).then((json) => json.etablissement);
  if (tis) {
    const tiNames = (await Promise.all(tis.map(getEtablissementByTi))).join(
      ", "
    );
    return tiNames;
  }
};

module.exports = {
  getAllTisByMandataire,
  getTisNames,
};
