import { formatFormInput } from "../../../util";
function mapNbPreposeNombrePreposesParNiveauQualificationFromForm(data) {
  return {
    nb_preposes: formatFormInput(!data ? null : data.nb_preposes),
    nb_preposes_etp: formatFormInput(!data ? null : data.nb_preposes_etp),
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
  const formData = {
    nb_preposes_homme: formatFormInput(data.nb_preposes_homme),
    nb_preposes_femme: formatFormInput(data.nb_preposes_femme),
    nb_autre_personnel: formatFormInput(data.nb_autre_personnel),
    nb_autre_personnel_etp: formatFormInput(data.nb_autre_personnel_etp),
    niveaux_qualification: mapNiveauQualifications(!data ? null : data.niveaux_qualification),
  };
  return formData;
}
export const enquetePreposePersonnelFormationAutresFormMapper = {
  dataToForm,
};
