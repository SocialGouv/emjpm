import { parseFloatValue, parseIntValue } from "../../../util";

function mapFormation_preposes_mjpm_nb_prepose_heures_formation(data) {
  return {
    nb_preposes: !data ? "" : parseIntValue(data.nb_preposes),
    heures_formation: !data ? "" : parseFloatValue(data.heures_formation),
  };
}
function mapFormation_preposes_mjpm(data) {
  return {
    en_poste_cnc: mapFormation_preposes_mjpm_nb_prepose_heures_formation(
      data ? data.en_poste_cnc : null
    ),
    embauches_cnc: mapFormation_preposes_mjpm_nb_prepose_heures_formation(
      data ? data.embauches_cnc : null
    ),
    formation_non_cnc: mapFormation_preposes_mjpm_nb_prepose_heures_formation(
      data ? data.formation_non_cnc : null
    ),
  };
}

function dataToForm(data) {
  return {
    nb_preposes_mjpm: data.nb_preposes_mjpm ? parseIntValue(data.nb_preposes_mjpm) : "",
    nb_preposes_mjpm_etp: data.nb_preposes_mjpm_etp
      ? parseFloatValue(data.nb_preposes_mjpm_etp)
      : "",
    formation_preposes_mjpm: mapFormation_preposes_mjpm(data.formation_preposes_mjpm),
  };
}
export const enquetePreposePersonnelFormationMjpmFormMapper = {
  dataToForm,
};
