import { useMutation, useQuery } from "@apollo/client";
import React, { useContext } from "react";

import { UserContext } from "~/components/UserContext";
import { parseFormFloat, parseFormInt } from "~/util";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
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
  } = props; /* mandataireId, enquete */
  const {
    enquete_reponse_ids: { personel_formation_id },
  } = enqueteReponse;
  const { id: userId } = useContext(UserContext);
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
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId },
        },
        {
          query: ENQUETE_PREPOSE_PERSONNEL_FORMATION,
          variables: { id: personel_formation_id },
        },
      ],
    }
  );

  const initialData = data
    ? data.enquete_reponses_prepose_personel_formation_by_pk || {}
    : {};

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
              formation_non_cnc: parseNbPreposeHeuresFormationFromForm(
                values.formation_preposes_mjpm.formation_non_cnc
              ),
              non_formation_non_cnc: parseNbPreposeHeuresFormationFromForm(
                values.formation_preposes_mjpm.non_formation_non_cnc
              ),
            }
          : null;

        await sendEnqueteReponseInformations({
          variables: {
            formation_preposes_mjpm,
            id: personel_formation_id,
            nb_preposes_mjpm: parseFormInt(values.nb_preposes_mjpm),
            nb_preposes_mjpm_etp: parseFormFloat(values.nb_preposes_mjpm_etp),
          },
        });
      }}
    />
  );
};

export default EnquetePreposePersonnelFormationMjpm;
function parseNbPreposeHeuresFormationFromForm(val) {
  return {
    heures_formation: val ? parseFormFloat(val.heures_formation) : null,
    nb_preposes: val ? parseFormInt(val.nb_preposes, 10) : null,
  };
}
