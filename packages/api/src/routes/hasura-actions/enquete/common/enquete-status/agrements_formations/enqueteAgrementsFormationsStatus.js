const { getValidationStatus } = require("../enqueteSchemaUtil");
const yup = require("yup");
const { ENQ_REP_AGREMENTS_FORMATIONS } = require("../../constants");

module.exports = {
  agrementsStatus: async enqueteReponse =>
    await getValidationStatus(
      enqueteReponse.enquete_reponses_agrements_formations,
      yup.object({
        annee_agrement: yup
          .number()
          .min(1900)
          .required(),
        nb_departements: yup
          .mixed()
          .oneOf(ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.keys)
          .required()
      })
    ),
  formationStatus: async enqueteReponse =>
    await getValidationStatus(
      enqueteReponse.enquete_reponses_agrements_formations,
      yup.object({
        cnc_annee_obtention: yup
          .number()
          .required()
          .positive()
          .integer(),
        cnc_heures_formation: yup
          .number()
          .required()
          .positive()
          .integer(),
        niveau_qualification: yup
          .number()
          .required()
          .min(1)
          .max(6)
          .integer()
      })
    )
};
