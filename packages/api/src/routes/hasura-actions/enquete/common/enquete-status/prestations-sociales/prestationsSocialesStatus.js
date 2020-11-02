const { getValidationStatus } = require("../enqueteSchemaUtil");
const yup = require("yup");

module.exports = async (enqueteReponse) => {
  return {
    global: await getValidationStatus(
      enqueteReponse.enquete_reponses_prestations_sociale,
      {
        debugName: `prestationsSociales`,
        logData: false,
        logDataIfEmpty: false,
        logDataWithErrors: false,
        schema: yup.object({
          aah: yup.number().min(0).nullable(),
          als_apl: yup.number().min(0).nullable(),
          apa: yup.number().min(0).nullable(),
          asi: yup.number().min(0).nullable(),
          aspa: yup.number().min(0).nullable(),
          pch: yup.number().min(0).nullable(),
          rsa: yup.number().min(0).nullable(),
        }),
      }
    ),
  };
};
