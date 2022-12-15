/* eslint-disable sort-keys-fix/sort-keys-fix */
const knex = require("~/db/knex");

const mandatairesSQL = knex.select("*").from("mandataires");
const usersSQL = knex
  .select(
    "id",
    "created_at",
    "type",
    "active",
    "nom",
    "prenom",
    "cabinet",
    "email",
    "genre"
  )
  .from("users");
const regionsSQL = knex.select("*").from("regions");
const departementsSQL = knex.select("*").from("departements");
const servicesSQL = knex("services")
  .join(
    "service_departements",
    "services.id",
    "=",
    "service_departements.service_id"
  )
  .select("services.*", "service_departements.departement_code");

const midSQL = knex.select("*").from("mandataire_individuel_departements");
const mesuresSQL = knex.select("*").from("mesures");
const mesureEtatSQL = knex.select("*").from("mesure_etat");
const mesureResourcesSQL = knex.select("*").from("mesure_ressources");
const mrpsSQL = knex.select("*").from("mesure_ressources_prestations_sociales");

module.exports = {
  mandataires: mandatairesSQL,
  users: usersSQL,
  regions: regionsSQL,
  departements: departementsSQL,
  services: servicesSQL,
  mid: midSQL,
  mesures: mesuresSQL,
  mesure_etat: mesureEtatSQL,
  mesure_ressources: mesureResourcesSQL,
  mrps: mrpsSQL,
};
