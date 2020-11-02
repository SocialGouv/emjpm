const {
  getValidationStatus,
  getGlobalStatus,
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "servicePersonnelFormation";

module.exports = async (enqueteReponse) => {
  const status = {
    personnelFormation: await getValidationStatus(
      enqueteReponse.enquete_reponses_service_personnel_formation,
      {
        debugName: `${debugGroupName}`,
        logDataWithErrors: false,
        schema: yup.object().shape({
          nb_delegues: yup.number().min(0).integer().nullable(),
          nb_delegues_cnc: yup.number().integer().min(0).nullable(),
          nb_delegues_en_formation: yup.number().integer().min(0).nullable(),
          nb_delegues_etp: yup.number().min(0).nullable(),
          nb_delegues_femme: yup.number().integer().min(0).nullable(),
          nb_delegues_femme_etp: yup.number().min(0).nullable(),
          nb_delegues_homme: yup.number().integer().min(0).nullable(),
          nb_delegues_homme_etp: yup.number().min(0).nullable(),
          nb_delegues_niveau1: yup.number().integer().min(0).nullable(),
          nb_delegues_niveau1_etp: yup.number().min(0).nullable(),
          nb_delegues_niveau2: yup.number().integer().min(0).nullable(),
          nb_delegues_niveau2_etp: yup.number().min(0).nullable(),
          nb_delegues_niveau3: yup.number().integer().min(0).nullable(),
          nb_delegues_niveau3_etp: yup.number().min(0).nullable(),
          nb_delegues_niveau4: yup.number().integer().min(0).nullable(),
          nb_delegues_niveau4_etp: yup.number().min(0).nullable(),
          nb_delegues_niveau5: yup.number().integer().min(0).nullable(),
          nb_delegues_niveau5_etp: yup.number().min(0).nullable(),
          nb_delegues_niveau6: yup.number().integer().min(0).nullable(),
          nb_delegues_niveau6_etp: yup.number().min(0).nullable(),
          nb_delegues_non_formes: yup.number().integer().min(0).nullable(),
          total_heures_delegues_en_formation: yup.number().min(0).nullable(),
        }),
      }
    ),
  };

  status.global = getGlobalStatus(status);

  return status;
};
