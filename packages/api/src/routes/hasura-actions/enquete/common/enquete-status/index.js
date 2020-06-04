const { getGlobalStatus, getValidationStatus } = require("./enqueteSchemaUtil");
const enqueteActiviteStatus = require("./activite/enqueteActiviteStatus");
const enqueteInformationsMandatairesStatus = require("./informations_mandataire/enqueteInformationsMandatairesStatus");
const populationsStatus = require("./populations/populationsStatus");
const enqueteModalitesExerciceStatus = require("./modalites-exercice/enqueteModalitesExerciceStatus");
const prestationsSocialesStatus = require("./prestations-sociales/prestationsSocialesStatus");

module.exports = {
  getGlobalStatus,
  getValidationStatus,
  enqueteActiviteStatus,
  enqueteInformationsMandatairesStatus,
  populationsStatus,
  prestationsSocialesStatus,
  enqueteModalitesExerciceStatus
};
