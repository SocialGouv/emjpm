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
        schema: yup.object().shape({
          nom: yup.string().required(),
          departement: yup.string().required(),
          region: yup.string().required(),
        }),
        debugName: `${debugGroupName}`,
        logDataWithErrors: false,
      }
    ),
  };

  status.global = getGlobalStatus(status);

  return status;
};
