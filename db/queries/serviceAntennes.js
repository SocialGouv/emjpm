const knex = require("../knex.js");

const getAllAntennesByMandataireId = mandataireId =>
  knex("service_antennes").where({
    mandataire_id: parseInt(mandataireId)
  });

const addAntenne = data => knex("service_antennes").insert(data);

const deleteAntenne = where =>
  knex("service_antennes")
    .where(where)
    .del();

module.exports = {
  getAllAntennesByMandataireId,
  addAntenne,
  deleteAntenne
};
