const knex = require("../knex.js");

const getAllAntennes = mandataireId =>
  knex("service_antennes").where({
    mandataire_id: parseInt(mandataireId)
  });

const addAntenne = mandataireId =>
  knex("service_antennes").insert(mandataireId);

const deleteAntenne = where =>
  knex("service_antennes")
    .where(where)
    .del();

module.exports = {
  getAllAntennes,
  addAntenne,
  deleteAntenne
};
