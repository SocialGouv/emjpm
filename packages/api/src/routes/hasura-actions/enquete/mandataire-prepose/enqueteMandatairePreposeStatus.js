const {
  getTopLevelGlobalStatus,
  populationsStatus,
  enqueteModalitesExerciceStatus,
  enqueteActiviteStatus,
  preposePersonnelFormationStatus,
  preposePrestationsSocialesStatus,
  preposeFinancementStatus
} = require("../common/enquete-status");

async function enqueteMandatairePreposeStatus(enqueteReponse) {
  const status = {
    modalitesExercice: await enqueteModalitesExerciceStatus(enqueteReponse),
    activite: await enqueteActiviteStatus(enqueteReponse),
    populations: await populationsStatus(enqueteReponse),
    personnelFormation: await preposePersonnelFormationStatus(enqueteReponse),
    prestationsSociales: await preposePrestationsSocialesStatus(enqueteReponse),
    financement: await preposeFinancementStatus(enqueteReponse)
  };

  status.global = getTopLevelGlobalStatus(
    Object.values(status).map(x => x.global)
  );

  return status;
}

module.exports = enqueteMandatairePreposeStatus;
