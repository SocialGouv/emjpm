const yup = require("yup");

const { getValidationStatus } = require("../enqueteSchemaUtil");
const { ENQ_REP_AGREMENTS_FORMATIONS } = require("../../constants");

module.exports = {
  agrementsStatus: async (
    enqueteReponse,
    { debugGroupName, logDataWithErrors }
  ) => {
    const validationResult = await getValidationStatus(
      enqueteReponse.enquete_reponses_agrements_formation,
      {
        debugName: `${debugGroupName}/agrementsStatus`,
        logDataWithErrors,
        schema: yup.object({
          annee_agrement: yup.number().integer().min(2009).required(),
          debut_activite_avant_2009: yup.boolean().required(),
          nb_departements: yup
            .mixed()
            .oneOf(ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.keys)
            .required(),
          nb_mesures_dep_autres: yup.number().integer().required(),
          nb_mesures_dep_finance: yup.number().integer().required(),
        }),
      }
    );
    return validationResult;
  },
  formationStatus: async (
    enqueteReponse,
    { debugGroupName, logDataWithErrors }
  ) => {
    const informations_generales_secretaire_specialise_etp = enqueteReponse.enquete_reponses_informations_mandataire
      ? enqueteReponse.enquete_reponses_informations_mandataire
          .secretaire_specialise_etp
      : undefined;
    const data = {
      ...enqueteReponse.enquete_reponses_agrements_formation,
      informations_generales_secretaire_specialise_etp,
    };
    const validationResult = await getValidationStatus(data, {
      debugName: `${debugGroupName}/formationStatus`,
      logDataWithErrors,
      schema: yup.object({
        cnc_annee_obtention: yup.number().positive().integer().required(),
        cnc_heures_formation: yup.number().positive().required(),
        informations_generales_secretaire_specialise_etp: yup
          .number()
          .nullable(),
        niveau_qualification: yup.number().min(1).max(6).integer().required(),
        secretaire_specialise_etp_n1: yup.number().min(0).nullable(),
        secretaire_specialise_etp_n2: yup.number().min(0).nullable(),
        secretaire_specialise_etp_n3: yup.number().min(0).nullable(),
        secretaire_specialise_etp_n4: yup.number().min(0).nullable(),
        secretaire_specialise_etp_n5: yup.number().min(0).nullable(),
        secretaire_specialise_etp_n6: yup.number().min(0).nullable(),
      }),
    });
    return validationResult;
  },
};
