const {
  getValidationStatus,
  getGlobalStatus,
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "preposePersonnelFormation";

module.exports = async (enqueteReponse) => {
  const status = {
    autres: await getValidationStatus(
      enqueteReponse.enquete_reponses_prepose_personel_formation,
      {
        debugName: `${debugGroupName}/autres`,
        logDataWithErrors: false,
        schema: yup.object({
          nb_autre_personnel: yup.number().integer().min(0).nullable(),
          nb_autre_personnel_etp: yup.number().min(0).nullable(),
          nb_preposes_femme: yup.number().integer().min(0).nullable(),
          nb_preposes_homme: yup.number().integer().min(0).nullable(),
          niveaux_qualification: yup.object({
            n1: validate_nb_preposes_niveaux_qualitifcation(),
            n2: validate_nb_preposes_niveaux_qualitifcation(),
            n3: validate_nb_preposes_niveaux_qualitifcation(),
            n4: validate_nb_preposes_niveaux_qualitifcation(),
            n5: validate_nb_preposes_niveaux_qualitifcation(),
            n6: validate_nb_preposes_niveaux_qualitifcation(),
          }),
        }),
      }
    ),
    mjpm: await getValidationStatus(
      enqueteReponse.enquete_reponses_prepose_personel_formation,
      {
        debugName: `${debugGroupName}/mjpm`,
        logDataWithErrors: false,
        schema: yup.object({
          formation_preposes_mjpm: yup.object({
            en_poste_cnc: validate_nb_preposes_heures_formation(),
            formation_non_cnc: validate_nb_preposes_heures_formation(),
            non_formation_non_cnc: validate_nb_preposes_heures_formation(),
          }),
          nb_preposes_mjpm: yup.number().integer().min(0).required(),
          nb_preposes_mjpm_etp: yup.number().integer().min(0).required(),
        }),
      }
    ),
  };

  status.global = getGlobalStatus(status);

  return status;
};

function validate_nb_preposes_heures_formation() {
  return yup.object({
    heures_formation: yup.number().min(0).nullable(),
    nb_preposes: yup.number().integer().min(0).nullable(),
  });
}

function validate_nb_preposes_niveaux_qualitifcation() {
  return yup.object({
    nb_preposes: yup.number().integer().min(0).nullable(),
    nb_preposes_etp: yup.number().min(0).nullable(),
  });
}
