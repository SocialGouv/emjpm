const {
  getValidationStatus,
  getGlobalStatus,
} = require("../enqueteSchemaUtil");
const { buildPopulationValidator } = require("./enquetePopulationsValidator");

const debugGroupName = "populations";

module.exports = async (enqueteReponse) => {
  const status = {
    accompagnementJudiciaire: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        debugName: `${debugGroupName}/accompagnementJudiciaire`,
        logDataWithErrors: false,
        schema: buildPopulationValidator({ prefix: "maj" }),
      }
    ),
    autresMesures: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        debugName: `${debugGroupName}/autresMesures`,
        logDataWithErrors: false,
        schema: buildPopulationValidator({ prefix: "autre_mesures" }),
      }
    ),
    curatelle: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        debugName: `${debugGroupName}/curatelle`,
        logDataIfEmpty: false,
        logDataWithErrors: false,
        schema: buildPopulationValidator({ prefix: "curatelle" }),
      }
    ),
    sauvegardeJustice: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        debugName: `${debugGroupName}/sauvegardeJustice`,
        logDataWithErrors: false,
        schema: buildPopulationValidator({ prefix: "sauvegarde_justice" }),
      }
    ),
    tutelle: await getValidationStatus(
      enqueteReponse.enquete_reponses_population,
      {
        debugName: `${debugGroupName}/tutelle`,
        logDataIfEmpty: false,
        logDataWithErrors: false,
        schema: buildPopulationValidator({ prefix: "tutelle" }),
      }
    ),
  };

  status.global = getGlobalStatus(status);
  return status;
};
