const {
  getValidationStatus,
  getGlobalStatus
} = require("../enqueteSchemaUtil");
const yup = require("yup");

const debugGroupName = "preposePersonelFormation";

module.exports = async enqueteReponse => {
  const status = {
    mjpm: await getValidationStatus(
      enqueteReponse.enquete_reponses_prepose_personel_formation,
      {
        schema: yup.object({
          nb_preposes_mjpm: yup
            .number()
            .integer()
            .min(0)
            .required(),
          nb_preposes_mjpm_etp: yup
            .number()
            .integer()
            .min(0)
            .required(),
          formation_preposes_mjpm: yup.object({
            en_poste_cnc: validate_nb_preposes_heures_formation(),
            embauches_cnc: validate_nb_preposes_heures_formation(),
            formation_non_cnc: validate_nb_preposes_heures_formation()
          })
        }),
        debugName: `${debugGroupName}/informationsMjpm`,
        logDataWithErrors: false
      }
    )
  };

  status.global = getGlobalStatus(status);

  return status;
};

function validate_nb_preposes_heures_formation() {
  return yup.object({
    nb_preposes: yup
      .number()
      .integer()
      .min(0),
    heures_formation: yup.number().min(0)
  });
}
