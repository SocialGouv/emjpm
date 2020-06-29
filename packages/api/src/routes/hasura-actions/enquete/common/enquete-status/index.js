const {
  getGlobalStatus,
  getValidationStatus,
  getTopLevelGlobalStatus,
} = require("./enqueteSchemaUtil");
const enqueteActiviteStatus = require("./activite/enqueteActiviteStatus");
const enqueteInformationsMandatairesStatus = require("./informations_mandataire/enqueteInformationsMandatairesStatus");
const populationsStatus = require("./populations/populationsStatus");
const enqueteModalitesExerciceStatus = require("./modalites-exercice/enqueteModalitesExerciceStatus");
const prestationsSocialesStatus = require("./prestations-sociales/prestationsSocialesStatus");
const preposePersonnelFormationStatus = require("./prepose-personnel-formation/enquetePreposePersonnelFormationStatus");
const preposePrestationsSocialesStatus = require("./prepose-prestations-sociales/enquetePreposePrestationsSocialesStatus");
const preposeFinancementStatus = require("./prepose-financement/enquetePreposeFinancementStatus");
const serviceInformationsStatus = require("./service-informations/enqueteServiceInformationsStatus");
const servicePersonnelFormationStatus = require("./service-personnel-formation/enqueteServicePersonnelFormationStatus");

module.exports = {
  getTopLevelGlobalStatus,
  getGlobalStatus,
  getValidationStatus,
  enqueteActiviteStatus,
  enqueteInformationsMandatairesStatus,
  populationsStatus,
  prestationsSocialesStatus,
  enqueteModalitesExerciceStatus,
  preposePersonnelFormationStatus,
  preposePrestationsSocialesStatus,
  preposeFinancementStatus,
  serviceInformationsStatus,
  servicePersonnelFormationStatus,
};
