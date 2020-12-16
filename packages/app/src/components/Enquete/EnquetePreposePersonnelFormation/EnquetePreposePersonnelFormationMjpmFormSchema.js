import yup from "~/lib/validationSchemas/yup";

// schema identique à enquetePreposePersonnelFormationStatus
export const enquetePreposePersonnelFormationMjpmFormSchema = yup
  .object()
  .shape({
    formation_preposes_mjpm: yup.object({
      en_poste_cnc: validate_nb_preposes_heures_formation(),
      formation_non_cnc: validate_nb_preposes_heures_formation(),
      non_formation_non_cnc: validate_nb_preposes_heures_formation(),
    }),
    nb_preposes_mjpm: yup.number().integer().min(0).required(),
    nb_preposes_mjpm_etp: yup.number().integer().min(0).required(),
  });
function validate_nb_preposes_heures_formation() {
  return yup.object({
    heures_formation: yup.number().min(0).nullable(),
    nb_preposes: yup.number().integer().min(0).nullable(),
  });
}
