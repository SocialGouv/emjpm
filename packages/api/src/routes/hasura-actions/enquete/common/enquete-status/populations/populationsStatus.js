const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

module.exports = async enqueteReponse => {
  const status = {
    curatelle: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      yup.object({}),
      "populations/curatelle"
    ),
    tutelle: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      yup.object({}),
      "populations/tutelle"
    ),
    accompagnementJudiciaire: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      yup.object({}),
      "populations/accompagnementJudiciaire"
    ),
    sauvegardeJustice: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      yup.object({}),
      "populations/sauvegardeJustice"
    ),
    autresMesures: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      yup.object({}),
      "populations/autresMesures"
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
