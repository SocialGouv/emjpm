const { getValidationStatus } = require("../enqueteSchemaUtil");
const yup = require("yup");

module.exports = async enqueteReponse => {
  return {
    global: await getValidationStatus(
      enqueteReponse.enquete_reponses_prestations_sociale,
      {
        schema: yup.object({
          aah: yup
            .number()
            .min(0)
            .nullable(),
          als_apl: yup
            .number()
            .min(0)
            .nullable(),
          apa: yup
            .number()
            .min(0)
            .nullable(),
          asi: yup
            .number()
            .min(0)
            .nullable(),
          aspa: yup
            .number()
            .min(0)
            .nullable(),
          pch: yup
            .number()
            .min(0)
            .nullable(),
          rsa: yup
            .number()
            .min(0)
            .nullable()
        }),
        debugName: `prestationsSociales`,
        logDataWithErrors: false,
        logDataIfEmpty: false,
        logData: false
      }
    )
  };
};
