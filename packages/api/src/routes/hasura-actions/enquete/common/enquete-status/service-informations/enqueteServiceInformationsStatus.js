const {
  getValidationStatus,
  getGlobalStatus,
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "serviceInformations";

module.exports = async (enqueteReponse) => {
  const status = {
    informations: await getValidationStatus(
      enqueteReponse.enquete_reponses_service_information,
      {
        debugName: `${debugGroupName}`,
        logDataWithErrors: false,
        schema: yup.object().shape({
          departement: yup.string().required(),
          nom: yup.string().required(),
          region: yup.string().required(),
        }),
      }
    ),
  };

  status.global = getGlobalStatus(status);

  return status;
};
