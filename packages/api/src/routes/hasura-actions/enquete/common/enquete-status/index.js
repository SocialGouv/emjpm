const {
  getGlobalStatus,
  getValidationStatus,
  getTopLevelGlobalStatus
} = require("./enqueteSchemaUtil");
const enqueteActiviteStatus = require("./activite/enqueteActiviteStatus");
const enqueteInformationsMandatairesStatus = require("./informations_mandataire/enqueteInformationsMandatairesStatus");
const populationsStatus = require("./populations/populationsStatus");
const enqueteModalitesExerciceStatus = require("./modalites-exercice/enqueteModalitesExerciceStatus");
const prestationsSocialesStatus = require("./prestations-sociales/prestationsSocialesStatus");
const preposePersonelFormationStatus = require("./prepose_personel_formation/enquetePreposePersonelFormationStatus");

module.exports = {
  getTopLevelGlobalStatus,
  getGlobalStatus,
  getValidationStatus,
  enqueteActiviteStatus,
  enqueteInformationsMandatairesStatus,
  populationsStatus,
  prestationsSocialesStatus,
  enqueteModalitesExerciceStatus,
  preposePersonelFormationStatus
};
