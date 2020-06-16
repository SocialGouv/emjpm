import { parseFloatValue, parseIntValue } from "../../../util";
function mapNbPreposeNombrePreposesParNiveauQualificationFromForm(data) {
  return {
    nb_preposes: !data ? "" : parseIntValue(data.nb_preposes),
    nb_preposes_etp: !data ? "" : parseFloatValue(data.nb_preposes_etp),
  };
}

function mapNiveauQualifications(data) {
  return {
    n1: mapNbPreposeNombrePreposesParNiveauQualificationFromForm(data ? data.n1 : null),
    n2: mapNbPreposeNombrePreposesParNiveauQualificationFromForm(data ? data.n2 : null),
    n3: mapNbPreposeNombrePreposesParNiveauQualificationFromForm(data ? data.n3 : null),
    n4: mapNbPreposeNombrePreposesParNiveauQualificationFromForm(data ? data.n4 : null),
    n5: mapNbPreposeNombrePreposesParNiveauQualificationFromForm(data ? data.n5 : null),
    n6: mapNbPreposeNombrePreposesParNiveauQualificationFromForm(data ? data.n6 : null),
  };
}

function dataToForm(data) {
  return {
    nb_preposes_homme: data.nb_preposes_homme ? parseIntValue(data.nb_preposes_homme) : "",
    nb_preposes_femme: data.nb_preposes_femme ? parseIntValue(data.nb_preposes_femme) : "",
    nb_autre_personnel: data.nb_autre_personnel ? parseIntValue(data.nb_autre_personnel) : "",
    nb_autre_personnel_etp: data.nb_autre_personnel_etp
      ? parseFloatValue(data.nb_autre_personnel_etp)
      : "",
    niveaux_qualification: mapNiveauQualifications(data.niveaux_qualification),
  };
}
export const enquetePreposePersonnelFormationAutresFormMapper = {
  dataToForm,
};
