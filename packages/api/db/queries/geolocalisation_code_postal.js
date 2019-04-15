const knex = require("../knex.js");

const getCoordonneesByPostCode = codePostal =>
  knex
    .from("geolocalisation_code_postal")
    .where("code_postal", codePostal)
    .first();

module.exports = {
  getCoordonneesByPostCode
};
