const knex = require("../knex.js");

const getAllTisByMandataire = mandataireId =>
  knex("mandataire_tis")
    .select("tis.id", "tis.etablissement", "mandataire_tis.ti_id")
    .innerJoin("tis", "mandataire_tis.ti_id", "tis.id")
    .where({
      mandataire_id: parseInt(mandataireId)
    });

const addMandataireTis = data => knex("mandataire_tis").insert(data);

const deleteMandataireTis = (tiId, mandataireId) =>
  knex("mandataire_tis")
    .where({ ti_id: parseInt(tiId), mandataire_id: parseInt(mandataireId) })
    .first()
    .del();

const getTis = () => knex("tis");

const getTiByUserId = userId =>
  knex("tis")
    .select(
      "tis.*",
      "users_tis.cabinet",
      "users_tis.email",
      "users.type",
      "users.last_login",
      "users.active",
      "users.reset_password_token",
      "users.reset_password_expires"
    )
    .innerJoin("users_tis", "users_tis.ti_id", "tis.id")
    .innerJoin("users", "users_tis.user_id", "users.id")
    .where("users_tis.user_id", parseInt(userId))
    .first();

module.exports = {
  getAllTisByMandataire,
  addMandataireTis,
  deleteMandataireTis,
  getTis,
  getTiByUserId
};
