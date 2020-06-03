const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

module.exports = async enqueteReponse => {
  const status = {
    curatelle: await getValidationStatus(
      enqueteReponse.populations,
      yup.object({})
    ),
    tutelle: await getValidationStatus(
      enqueteReponse.populations,
      yup.object({})
    ),
    accompagnementJudiciaire: await getValidationStatus(
      enqueteReponse.populations,
      yup.object({})
    ),
    sauvegardeJustice: await getValidationStatus(
      enqueteReponse.populations,
      yup.object({})
    ),
    autresMesures: await getValidationStatus(
      enqueteReponse.populations,
      yup.object({})
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
