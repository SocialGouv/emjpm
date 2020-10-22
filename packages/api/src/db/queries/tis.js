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

module.exports = {
  getAllTisByMandataire,
};
