import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { parseFormFloat, parseFormInt } from "../../../util";
import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnquetePreposePersonnelFormationAutresForm } from "./EnquetePreposePersonnelFormationAutresForm";
import { UPDATE_ENQUETE_PREPOSE_PERSONNEL_FORMATION_AUTRES } from "./mutations";
import { ENQUETE_PREPOSE_PERSONNEL_FORMATION } from "./queries";

export const EnquetePreposePersonnelFormationAutres = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    step,
    enquete: { id: enqueteId },
  } = props; /* mandataireId, enquete */
  const {
    enquete_reponse_ids: { personel_formation_id },
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_PREPOSE_PERSONNEL_FORMATION, {
    variables: {
      id: personel_formation_id,
    },
  });

  const [sendEnqueteReponseInformations] = useMutation(
    UPDATE_ENQUETE_PREPOSE_PERSONNEL_FORMATION_AUTRES,
    {
      refetchQueries: [
        {
          query: ENQUETE_REPONSE_STATUS,
          variables: { enqueteId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_PREPOSE_PERSONNEL_FORMATION,
          variables: { id: personel_formation_id },
        },
      ],
    }
  );

  const initialData = data ? data.enquete_reponses_prepose_personel_formation_by_pk || {} : {};

  return (
    <EnquetePreposePersonnelFormationAutresForm
      data={initialData}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      step={step}
      onSubmit={async (values) => {
        const niveaux_qualification = values.niveaux_qualification
          ? {
              n1: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n1
              ),
              n2: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n2
              ),
              n3: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n3
              ),
              n4: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n4
              ),
              n5: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n5
              ),
              n6: parseNbPreposeNombrePreposesParNiveauQualificationFromForm(
                values.niveaux_qualification.n6
              ),
            }
          : null;

        await sendEnqueteReponseInformations({
          variables: {
            id: personel_formation_id,
            nb_preposes_homme: parseFormInt(values.nb_preposes_homme),
            nb_preposes_femme: parseFormInt(values.nb_preposes_femme),
            nb_autre_personnel: parseFormInt(values.nb_autre_personnel),
            nb_autre_personnel_etp: parseFormFloat(values.nb_autre_personnel_etp),
            niveaux_qualification,
          },
        });
      }}
    />
  );
};

export default EnquetePreposePersonnelFormationAutres;
function parseNbPreposeNombrePreposesParNiveauQualificationFromForm(val) {
  return {
    nb_preposes: val ? parseFormInt(val.nb_preposes, 10) : null,
    nb_preposes_etp: val ? parseFormFloat(val.nb_preposes_etp) : null,
  };
}
