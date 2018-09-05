const knex = require("../knex.js");

function Mandataires() {
  return knex("mandataires");
}

const getAll = () => Mandataires().select();

const updateMandataireMailSent = id =>
  knex
    .table("mandataires")
    .where({ id })
    .update({ email_send: new Date() });

module.exports = {
  getAll,
  updateMandataireMailSent
};
