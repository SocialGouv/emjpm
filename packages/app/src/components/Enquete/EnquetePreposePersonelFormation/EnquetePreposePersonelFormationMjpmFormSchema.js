import yup from "../../../lib/validationSchemas/yup";

// schema identique à enquetePreposePersonelFormationStatus
export const enquetePreposePersonelFormationMjpmFormSchema = yup.object().shape({
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
});
function validate_nb_preposes_heures_formation() {
  return yup.object({
    nb_preposes: yup
      .number()
      .integer()
      .min(0)
      .nullable(),
    heures_formation: yup
      .number()
      .min(0)
      .nullable()
  });
}
