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
            .required(),
          charges_preposes: yup
            .number()
            .min(0)
            .required(),
          charges_fonctionnement: yup
            .number()
            .min(0)
            .required(),
          produits_bareme_prelevements: yup
            .number()
            .min(0)
            .required(),
          autre_produits: yup
            .number()
            .min(0)
            .required(),
          financement_public: yup
            .number()
            .min(0)
            .required(),
          aide_sociale_conseil_departemental: yup
            .number()
            .min(0)
            .required()
        }),
        debugName: `${debugGroupName}`,
        logDataWithErrors: true
      }
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
