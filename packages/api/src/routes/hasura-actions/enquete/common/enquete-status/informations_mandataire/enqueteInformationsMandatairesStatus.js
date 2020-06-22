const {
  getValidationStatus,
  getGlobalStatus,
} = require("../enqueteSchemaUtil");
const yup = require("yup");
const enqueteAgrementsFormationsStatus = require("../agrements_formations/enqueteAgrementsFormationsStatus");

const debugGroupName = "informationsGenerales";

module.exports = async (enqueteReponse) => {
  const agrements = await enqueteAgrementsFormationsStatus.agrementsStatus(
    enqueteReponse,
    {
      debugGroupName,
      logDataWithErrors: false,
    }
  );

  const formation = await enqueteAgrementsFormationsStatus.formationStatus(
    enqueteReponse,
    {
      debugGroupName,
      logDataWithErrors: false,
    }
  );

  const status = {
    informationsGenerales: await getValidationStatus(
      enqueteReponse.enquete_reponses_informations_mandataire,
      {
        schema: yup.object({
          nom: yup.string().required(),
          departement: yup.string().required(),
          region: yup.string().required(),
          benevole: yup.boolean().required(),
          forme_juridique: yup.string().when("benevole", {
            is: false,
            then: yup.string().required(),
            otherwise: yup.string().nullable(),
          }),
          anciennete: yup.string().required(),
          estimation_etp: yup.string().required(),
          exerce_seul_activite: yup.boolean().required(),
          exerce_secretaires_specialises: yup
            .boolean()
            .required()
            .when("exerce_seul_activite", {
              is: true,
              then: yup
                .boolean()
                .required()
                .test(
                  "equals-to-false",
                  "Vous avez déclaré exercer seul une activité.",
                  () => false
                ),
            }),
          secretaire_specialise_etp: yup
            .number()
            .when("exerce_secretaires_specialises", {
              is: true,
              then: yup.number().positive().required(), // > 0
              otherwise: yup
                .number()
                .test(
                  "empty-or-0",
                  'Vous avez répondu "non" à la question précédente, donc ce champ doit être vide.',
                  function (value) {
                    return value == null; // 0, null, undefined
                  }
                )
                .nullable(), // 0 or empty
            }),
          local_professionnel: yup.boolean().required(),
        }),
        debugName: `${debugGroupName}/agrementsStatus`,
        logDataWithErrors: false,
      }
    ),
    agrements,
    formation,
  };

  status.global = getGlobalStatus(status);
  return status;
};
