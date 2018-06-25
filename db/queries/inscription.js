var knex = require("../knex.js");

const getTiByRegion = () =>
  knex
    .table("tis")
    .select(
      "tis.id",
      knex.raw("tis.etablissement as nom"),
      knex.raw("regions.nom as region")
    )
    .innerJoin(
      "departements",
      "departements.code",
      knex.raw("LEFT(tis.code_postal, 2)")
    )
    .innerJoin("regions", "regions.id", "departements.id_region")
    .orderBy("regions.nom", "asc")
    .orderBy("tis.etablissement", "asc");

module.exports = {
  getTiByRegion
};
