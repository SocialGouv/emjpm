const {
  getTopLevelGlobalStatus,
  enqueteActiviteStatus,
  enqueteInformationsMandatairesStatus,
  populationsStatus,
  prestationsSocialesStatus,
} = require("../common/enquete-status");

async function enqueteMandataireIndividuelStatus(enqueteReponse) {
  const statusBuildContext = {
    allowEmpty: true,
  };
  // IMPORTANT: construire les status dans l'ordre d'affichage car un statut "empty" devient "invalid" si au moins un onglet précédent a été renseigné
  const status = {
    activite: await enqueteActiviteStatus(enqueteReponse),
    informations: await enqueteInformationsMandatairesStatus(
      enqueteReponse,
      statusBuildContext
    ),
    populations: await populationsStatus(enqueteReponse),
    prestationsSociales: await prestationsSocialesStatus(
      enqueteReponse,
      statusBuildContext
    ),
  };

  status.global = getTopLevelGlobalStatus(status);
  return status;
}

module.exports = enqueteMandataireIndividuelStatus;
