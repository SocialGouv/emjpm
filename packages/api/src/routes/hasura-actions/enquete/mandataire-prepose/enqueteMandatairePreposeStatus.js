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

  console.log(
    "xxx enqueteReponse.enquete_reponses_population:",
    enqueteReponse.enquete_reponses_population
  );
  console.log("xxx status.populations:", status.populations);

  status.global = getGlobalStatus(status);

  return status;
}

module.exports = enqueteMandatairePreposeStatus;
