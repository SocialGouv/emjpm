const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "preposeFinancement";

module.exports = async enqueteReponse => {
  const status = {
    financement: await getValidationStatus(
      enqueteReponse.enquete_reponses_financement,
      {
        schema: yup.object().shape({
          charges_personnel: yup
            .number()
            .min(0)
            .nullable(),
          charges_preposes: yup
            .number()
            .min(0)
            .nullable()
            .test(
              "charges-preposes-personnel",
              "La valeur de charges préposés ne peut être supérieure à la charge personnel total.",
              function(value) {
                const chargesPersonnel = this.parent["charges_personnel"] | 0;
                const chargesPrepose = value | 0;
                return chargesPersonnel >= chargesPrepose;
              }
            ),
          charges_fonctionnement: yup
            .number()
            .min(0)
            .nullable(),
          produits_bareme_prelevements: yup
            .number()
            .min(0)
            .nullable(),
          autre_produits: yup
            .number()
            .min(0)
            .nullable(),
          financement_public: yup
            .number()
            .min(0)
            .nullable(),
          aide_sociale_conseil_departemental: yup
            .number()
            .min(0)
            .nullable()
        }),
        debugName: `${debugGroupName}`,
        logDataWithErrors: true
      }
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
