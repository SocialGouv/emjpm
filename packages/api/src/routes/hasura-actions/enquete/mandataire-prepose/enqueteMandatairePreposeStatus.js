const {
  getTopLevelGlobalStatus,
  populationsStatus,
  enqueteModalitesExerciceStatus,
  enqueteActiviteStatus,
  preposePersonnelFormationStatus,
  preposePrestationsSocialesStatus,
  preposeFinancementStatus,
} = require("../common/enquete-status");

async function enqueteMandatairePreposeStatus(enqueteReponse) {
  const statusBuildContext = {
    allowEmpty: true,
  };
  // IMPORTANT: construire les status dans l'ordre d'affichage car un statut "empty" devient "invalid" si au moins un onglet précédent a été renseigné
  const modalitesExercice = await enqueteModalitesExerciceStatus(
    enqueteReponse,
    statusBuildContext
  );
  const activite = await enqueteActiviteStatus(
    enqueteReponse,
    statusBuildContext
  );
  const populations = await populationsStatus(
    enqueteReponse,
    statusBuildContext
  );
  const personnelFormation = await preposePersonnelFormationStatus(
    enqueteReponse,
    statusBuildContext
  );
  const prestationsSociales = await preposePrestationsSocialesStatus(
    enqueteReponse,
    statusBuildContext
  );
  const financement = await preposeFinancementStatus(
    enqueteReponse,
    statusBuildContext
  );
  const status = {
    modalitesExercice,
    activite,
    populations,
    personnelFormation,
    prestationsSociales,
    financement,
  };

  status.global = getTopLevelGlobalStatus(status);

  return status;
}

module.exports = enqueteMandatairePreposeStatus;
