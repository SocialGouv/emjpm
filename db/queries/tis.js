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
  knex
    .from("tis")
    .where("user_id", parseInt(userId))
    .first();

module.exports = {
  getAllTisByMandataire,
  addMandataireTis,
  deleteMandataireTis,
  getTis,
  getTiByUserId
};
