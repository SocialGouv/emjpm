const knex = require("../knex.js");

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

const createUser = (data, trx) =>
  (trx || knex).table("users").insert(data, "id");

const createMandataire = (data, trx) =>
  (trx || knex).table("mandataires").insert(data, "id");

const createMandataireTi = (data, trx) =>
  (trx || knex).table("mandataire_tis").insert(data, "id");

const createUserTi = (data, trx) =>
  (trx || knex).table("users_tis").insert(data, "id");

module.exports = {
  getTiByRegion,
  createUser,
  createMandataire,
  createMandataireTi,
  createUserTi
};
