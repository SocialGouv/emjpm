const mesures = require("./mesures");
const mesure = require("./mesure");
const mesureCreate = require("./mesure-create");
const mesureUpdate = require("./mesure-update");
const mesureBatch = require("./mesure-batch");
const mesureDelete = require("./mesure-delete");
const serviceAntennes = require("./service-antennes");
const tribunaux = require("./tribunaux");

module.exports = {
  mesures,
  mesure,
  mesureCreate,
  mesureUpdate,
  mesureBatch,
  mesureDelete,
  serviceAntennes,
  tribunaux,
};
