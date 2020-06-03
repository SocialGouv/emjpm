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
        exerce_secretaires_specialises: yup.boolean().nullable(),
        secretaire_specialise_etp: yup.number().nullable(),
        local_professionnel: yup.boolean().required()
      })
    ),
    agrements: enqueteAgrementsFormationsStatus.agrementsStatus(enqueteReponse),
    formation: enqueteAgrementsFormationsStatus.formationStatus(enqueteReponse)
  };

  status.global = getGlobalStatus(status);

  return status;
};
