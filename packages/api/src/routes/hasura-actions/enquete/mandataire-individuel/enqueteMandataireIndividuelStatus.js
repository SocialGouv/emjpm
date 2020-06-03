const {
  getGlobalStatus,
  enqueteActiviteStatus,
  enqueteInformationsMandatairesStatus,
  populationsStatus,
  prestationsSocialesStatus
} = require("../common/enquete-status");

async function enqueteMandataireIndividuelStatus(enqueteReponse) {
  const status = {
    informations: await enqueteInformationsMandatairesStatus(enqueteReponse),
    activite: await enqueteActiviteStatus(enqueteReponse),
    populations: await populationsStatus(enqueteReponse),
    prestationsSociales: await prestationsSocialesStatus(enqueteReponse)
  };

  status.global = getGlobalStatus(status);

  return status;
}

module.exports = enqueteMandataireIndividuelStatus;
