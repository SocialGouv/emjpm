const {
  getGlobalStatus,
  populationsStatus,
  enqueteModalitesExerciceStatus
} = require("../common/enquete-status");

async function enqueteMandatairePreposeStatus(enqueteReponse) {
  const status = {
    modalitesExercice: await enqueteModalitesExerciceStatus(enqueteReponse),
    populations: await populationsStatus(enqueteReponse)
  };

  status.global = getGlobalStatus(status);

  return status;
}

module.exports = enqueteMandatairePreposeStatus;
