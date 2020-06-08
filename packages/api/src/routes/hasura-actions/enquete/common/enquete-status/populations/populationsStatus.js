const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const { buildPopulationValidator } = require("./enquetePopulationsValidator");

const debugGroupName = "populations";

module.exports = async enqueteReponse => {
  const status = {
    curatelle: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        schema: buildPopulationValidator({ prefix: "curatelle" }),
        debugName: `${debugGroupName}/curatelle`,
        logDataWithErrors: false,
        logDataIfEmpty: false
      }
    ),
    tutelle: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        schema: buildPopulationValidator({ prefix: "tutelle" }),
        debugName: `${debugGroupName}/tutelle`,
        logDataWithErrors: false,
        logDataIfEmpty: false
      }
    ),
    accompagnementJudiciaire: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        schema: buildPopulationValidator({ prefix: "maj" }),
        debugName: `${debugGroupName}/accompagnementJudiciaire`,
        logDataWithErrors: false
      }
    ),
    sauvegardeJustice: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        schema: buildPopulationValidator({ prefix: "sauvegarde_justice" }),
        debugName: `${debugGroupName}/sauvegardeJustice`,
        logDataWithErrors: false
      }
    ),
    autresMesures: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        schema: buildPopulationValidator({ prefix: "autre_mesures" }),
        debugName: `${debugGroupName}/autresMesures`,
        logDataWithErrors: false
      }
    )
  };

  status.global = getGlobalStatus(status);
  return status;
};
