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
        schema: yup.object({
          debut_activite_avant_2009: yup.boolean().required(),
          annee_agrement: yup.number().integer().min(2009).required(),
          nb_departements: yup
            .mixed()
            .oneOf(ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.keys)
            .required(),
          nb_mesures_dep_finance: yup.number().integer().required(),
          nb_mesures_dep_autres: yup.number().integer().required(),
        }),
        debugName: `${debugGroupName}/agrementsStatus`,
        logDataWithErrors,
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
      schema: yup.object({
        cnc_annee_obtention: yup.number().positive().integer().required(),
        cnc_heures_formation: yup.number().positive().required(),
        niveau_qualification: yup.number().min(1).max(6).integer().required(),
        secretaire_specialise_etp_n1: yup.number().min(0).nullable(),
        secretaire_specialise_etp_n2: yup.number().min(0).nullable(),
        secretaire_specialise_etp_n3: yup.number().min(0).nullable(),
        secretaire_specialise_etp_n4: yup.number().min(0).nullable(),
        secretaire_specialise_etp_n5: yup.number().min(0).nullable(),
        secretaire_specialise_etp_n6: yup.number().min(0).nullable(),
        informations_generales_secretaire_specialise_etp: yup
          .number()
          .nullable()
          .test(function (value) {
            if (value !== undefined) {
              const etp1 = this.parent["secretaire_specialise_etp_n1"] | 0;
              const etp2 = this.parent["secretaire_specialise_etp_n2"] | 0;
              const etp3 = this.parent["secretaire_specialise_etp_n3"] | 0;
              const etp4 = this.parent["secretaire_specialise_etp_n4"] | 0;
              const etp5 = this.parent["secretaire_specialise_etp_n5"] | 0;
              const etp6 = this.parent["secretaire_specialise_etp_n6"] | 0;

              const expectedTotal = etp1 + etp2 + etp3 + etp4 + etp5 + etp6;

              if (expectedTotal !== value) {
                return this.createError({
                  message: `La somme des ETP des secrétaires spécialisés par niveau (${expectedTotal}) ne correspond pas à la valeur "Estimation de l'activité en ETP du secrétariat spécialisé" renseignée dans l'onglet "Informations Générales" (${value})`,
                  path: "informations_generales_secretaire_specialise_etp",
                });
              }
            }
            return true;
          }),
      }),
      debugName: `${debugGroupName}/formationStatus`,
      logDataWithErrors,
    });
    return validationResult;
  },
};
