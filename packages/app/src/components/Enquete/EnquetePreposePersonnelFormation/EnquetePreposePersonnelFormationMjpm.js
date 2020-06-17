import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { parseFormFloat, parseFormInt } from "../../../util";
import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnquetePreposePersonnelFormationMjpmForm } from "./EnquetePreposePersonnelFormationMjpmForm";
import { UPDATE_ENQUETE_PREPOSE_PERSONNEL_FORMATION_MJPM } from "./mutations";
import { ENQUETE_PREPOSE_PERSONNEL_FORMATION } from "./queries";

export const EnquetePreposePersonnelFormationMjpm = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    step,
    enquete: { id: enqueteId },
    userId,
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
    UPDATE_ENQUETE_PREPOSE_PERSONNEL_FORMATION_MJPM,
    {
      refetchQueries: [
        {
          query: ENQUETE_REPONSE_STATUS,
          variables: { enqueteId, userId },
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
    <EnquetePreposePersonnelFormationMjpmForm
      data={initialData}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      step={step}
      onSubmit={async (values) => {
        const formation_preposes_mjpm = values.formation_preposes_mjpm
          ? {
              en_poste_cnc: parseNbPreposeHeuresFormationFromForm(
                values.formation_preposes_mjpm.en_poste_cnc
              ),
              embauches_cnc: parseNbPreposeHeuresFormationFromForm(
                values.formation_preposes_mjpm.embauches_cnc
              ),
              formation_non_cnc: parseNbPreposeHeuresFormationFromForm(
                values.formation_preposes_mjpm.formation_non_cnc
              ),
            }
          : null;

        await sendEnqueteReponseInformations({
          variables: {
            id: personel_formation_id,
            nb_preposes_mjpm: parseFormInt(values.nb_preposes_mjpm),
            nb_preposes_mjpm_etp: parseFormFloat(values.nb_preposes_mjpm_etp),
            formation_preposes_mjpm,
          },
        });
      }}
    />
  );
};

export default EnquetePreposePersonnelFormationMjpm;
function parseNbPreposeHeuresFormationFromForm(val) {
  return {
    nb_preposes: val ? parseFormInt(val.nb_preposes, 10) : null,
    heures_formation: val ? parseFormFloat(val.heures_formation) : null,
  };
}
