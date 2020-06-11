const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "preposePrestationsSociales";

module.exports = async enqueteReponse => {
  const status = {
    repartition: await getValidationStatus(
      enqueteReponse.enquete_reponses_prepose_prestations_sociales,
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
        debugName: `${debugGroupName}/repartition`,
        logDataWithErrors: false
      }
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
