const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

module.exports = async enqueteReponse => {
  const status = {
    curatelle: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      yup.object({
        // TODO
      }),
      "populations/curatelle"
    ),
    tutelle: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      yup.object({
        // TODO
      }),
      "populations/tutelle"
    ),
    accompagnementJudiciaire: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      yup.object({
        // TODO
      }),
      "populations/accompagnementJudiciaire"
    ),
    sauvegardeJustice: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      yup.object({
        // TODO
      }),
      "populations/sauvegardeJustice"
    ),
    autresMesures: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      yup.object({
        // TODO
      }),
      "populations/autresMesures"
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
