import { formatFormInput } from "../../../util";

function mapFormation_preposes_mjpm_nb_prepose_heures_formation(data) {
  return {
    nb_preposes: formatFormInput(!data ? null : data.nb_preposes),
    heures_formation: formatFormInput(!data ? null : data.heures_formation),
  };
}
function mapFormation_preposes_mjpm(data) {
  return {
    en_poste_cnc: mapFormation_preposes_mjpm_nb_prepose_heures_formation(
      !data ? null : data.en_poste_cnc
    ),
    non_formation_non_cnc: mapFormation_preposes_mjpm_nb_prepose_heures_formation(
      !data ? null : data.non_formation_non_cnc
    ),
    formation_non_cnc: mapFormation_preposes_mjpm_nb_prepose_heures_formation(
      !data ? null : data.formation_non_cnc
    ),
  };
}

function dataToForm(data) {
  const formData = {
    nb_preposes_mjpm: formatFormInput(data.nb_preposes_mjpm),
    nb_preposes_mjpm_etp: formatFormInput(data.nb_preposes_mjpm_etp),
    formation_preposes_mjpm: mapFormation_preposes_mjpm(
      !data ? null : data.formation_preposes_mjpm
    ),
  };
  return formData;
}
export const enquetePreposePersonnelFormationMjpmFormMapper = {
  dataToForm,
};
