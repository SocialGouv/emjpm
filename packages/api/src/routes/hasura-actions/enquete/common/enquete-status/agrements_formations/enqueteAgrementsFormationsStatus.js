const { getValidationStatus } = require("../enqueteSchemaUtil");
const yup = require("yup");
const { ENQ_REP_AGREMENTS_FORMATIONS } = require("../../constants");

module.exports = {
  agrementsStatus: async (enqueteReponse, debugGroupName) =>
    await getValidationStatus(
      enqueteReponse.enquete_reponses_agrements_formation,
      yup.object({
        debut_activite_avant_2009: yup.boolean().required(),
        annee_agrement: yup
          .number()
          .integer()
          .min(2009)
          .required(),
        nb_departements: yup
          .mixed()
          .oneOf(ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.keys)
          .required(),
        nb_mesures_dep_finance: yup
          .number()
          .integer()
          .required(),
        nb_mesures_dep_autres: yup
          .number()
          .integer()
          .required()
      }),
      `${debugGroupName}/agrementsStatus`
    ),
  formationStatus: async (enqueteReponse, debugGroupName) =>
    await getValidationStatus(
      enqueteReponse.enquete_reponses_agrements_formation,
      yup.object({
        cnc_annee_obtention: yup
          .number()
          .positive()
          .integer()
          .required(),
        cnc_heures_formation: yup
          .number()
          .positive()
          .required(),
        niveau_qualification: yup
          .number()
          .min(1)
          .max(6)
          .integer()
          .required(),
        secretaire_specialise_etp_n1: yup.number().positive(),
        secretaire_specialise_etp_spe_n2: yup.number().positive(),
        secretaire_specialise_etp_spe_n3: yup.number().positive(),
        secretaire_specialise_etp_spe_n4: yup.number().positive(),
        secretaire_specialise_etp_spe_n5: yup.number().positive(),
        secretaire_specialise_etp_spe_n6: yup.number().positive()
      }),
      `${debugGroupName}/formationStatus`
    )
};
