const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "populations";

module.exports = async enqueteReponse => {
  const status = {
    curatelle: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        schema: yup.object({
          // TODO
        }),
        debugName: `${debugGroupName}/curatelle`,
        logDataWithErrors: false
      }
    ),
    tutelle: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        schema: yup.object({
          // TODO
        }),
        debugName: `${debugGroupName}/tutelle`,
        logDataWithErrors: false
      }
    ),
    accompagnementJudiciaire: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        schema: yup.object({
          // TODO
        }),
        debugName: `${debugGroupName}/accompagnementJudiciaire`,
        logDataWithErrors: false
      }
    ),
    sauvegardeJustice: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        schema: yup.object({
          // TODO
        }),
        debugName: `${debugGroupName}/sauvegardeJustice`,
        logDataWithErrors: false
      }
    ),
    autresMesures: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        schema: yup.object({
          // TODO
        }),
        debugName: `${debugGroupName}/autresMesures`,
        logDataWithErrors: false
      }
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
