const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");
const enqueteAgrementsFormationsStatus = require("../agrements_formations/enqueteAgrementsFormationsStatus");

module.exports = async enqueteReponse => {
  const status = {
    informationsGenerales: await getValidationStatus(
      enqueteReponse.enquete_reponses_informations_mandataire,
      yup.object({
        nom: yup.string().required(),
        departement: yup.string().required(),
        region: yup.string().required(),
        benevole: yup.boolean().required(),
        forme_juridique: yup.string().when("benevole", {
          is: false,
          then: yup.string().required(),
          otherwise: yup.string().nullable()
        }),
        anciennete: yup.string().required(),
        estimation_etp: yup.string().required(),
        exerce_seul_activite: yup.boolean().required(),
        exerce_secretaires_specialises: yup.boolean().required(),
        secretaire_specialise_etp: yup
          .number()
          .when("exerce_secretaires_specialises", {
            is: true,
            then: yup
              .number()
              .positive()
              .required(), // > 0
            otherwise: yup
              .number()
              .oneOf([0])
              .nullable() // 0 or empty
          }),
        local_professionnel: yup.boolean().required()
      }),
      "informationsGenerales/agrementsStatus"
    ),
    agrements: enqueteAgrementsFormationsStatus.agrementsStatus(
      enqueteReponse,
      "informationsGenerales"
    ),
    formation: enqueteAgrementsFormationsStatus.formationStatus(
      enqueteReponse,
      "informationsGenerales"
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};
