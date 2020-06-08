const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "modalitesExercice";

module.exports = async enqueteReponse => {
  const status = {
    informationsGenerales: await getValidationStatus(
      enqueteReponse.enquete_reponses_modalites_exercice,
      {
        schema: yup.object({
          // TODO
        }),
        debugName: `${debugGroupName}/informationsGenerales`,
        logDataWithErrors: false
      }
    ),
    etablissements: await getValidationStatus(
      enqueteReponse.enquete_reponses_modalites_exercice,
      {
        schema: yup.object({
          // TODO
        }),
        debugName: `${debugGroupName}/etablissements`,
        logDataWithErrors: false
      }
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
