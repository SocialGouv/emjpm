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
    informations: await enqueteInformationsMandatairesStatus(
      enqueteReponse,
      statusBuildContext
    ),
    activite: await enqueteActiviteStatus(enqueteReponse),
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
