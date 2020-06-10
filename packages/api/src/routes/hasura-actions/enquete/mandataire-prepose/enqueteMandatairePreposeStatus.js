const {
  getTopLevelGlobalStatus,
  populationsStatus,
  enqueteModalitesExerciceStatus,
  enqueteActiviteStatus,
  preposePersonelFormationStatus
} = require("../common/enquete-status");

async function enqueteMandatairePreposeStatus(enqueteReponse) {
  const status = {
    modalitesExercice: await enqueteModalitesExerciceStatus(enqueteReponse),
    activite: await enqueteActiviteStatus(enqueteReponse),
    populations: await populationsStatus(enqueteReponse),
    personelFormation: await preposePersonelFormationStatus(enqueteReponse)
  };

  status.global = getTopLevelGlobalStatus(
    Object.values(status).map(x => x.global)
  );

  return status;
}

module.exports = enqueteMandatairePreposeStatus;
