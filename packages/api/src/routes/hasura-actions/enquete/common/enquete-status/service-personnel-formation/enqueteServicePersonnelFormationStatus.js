const {
  getValidationStatus,
  getGlobalStatus,
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "servicePersonnelFormation";

module.exports = async (enqueteReponse) => {
  const status = {
    informations: await getValidationStatus(
      enqueteReponse.enquete_service_personnel_formation,
      {
        schema: yup.object().shape({}),
        debugName: `${debugGroupName}`,
        logDataWithErrors: false,
      }
    ),
  };

  status.global = getGlobalStatus(status);

  return status;
};
