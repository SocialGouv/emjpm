const {
  informationsGeneralesMandataireSchema,
  informationsAgrementsMandataireSchema,
  informationsFormationMandataireSchema,
  prestationsSocialesSchema
} = require("./schemas");
const enqueteMandataireIndividuelActiviteStatus = require("./activite");
const { getValidationStatus, getGlobalStatus } = require("../../common");

async function enqueteMandataireIndividuelStatus(enqueteReponse) {
  const informationsGeneralesMandataireStatus = await getValidationStatus(
    enqueteReponse.enquete_reponses_informations_mandataire,
    informationsGeneralesMandataireSchema
  );

  const informationsFormationMandataireStatus = await getValidationStatus(
    enqueteReponse.enquete_reponses_agrements_formation,
    informationsFormationMandataireSchema
  );

  const informationsAgrementsMandataireStatus = await getValidationStatus(
    enqueteReponse.enquete_reponses_agrements_formation,
    informationsAgrementsMandataireSchema
  );

  const prestationsSocialesStatus = await getValidationStatus(
    enqueteReponse.enquete_reponses_prestations_sociale,
    prestationsSocialesSchema
  );

  const populationsCuratelleStatus = "empty";
  const populationsTutelleStatus = "empty";
  const populationsAccompagnementJudiciaireStatus = "empty";
  const populationsSauvegardeJusticeStatus = "empty";
  const populationsAutreStatus = "empty";

  const status = {
    informationsGeneralesMandataireStatus,
    informationsFormationMandataireStatus,
    informationsAgrementsMandataireStatus,
    prestationsSocialesStatus,
    populationsCuratelleStatus,
    populationsTutelleStatus,
    populationsAccompagnementJudiciaireStatus,
    populationsSauvegardeJusticeStatus,
    populationsAutreStatus,
    activite: await enqueteMandataireIndividuelActiviteStatus(enqueteReponse)
  };

  status.global = getGlobalStatus(status);

  return status;
}

module.exports = enqueteMandataireIndividuelStatus;
