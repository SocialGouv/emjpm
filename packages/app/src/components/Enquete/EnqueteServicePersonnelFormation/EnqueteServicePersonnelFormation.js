import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";

import { UserContext } from "../../UserContext";
import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteServicePersonnelFormationForm } from "./EnqueteServicePersonnelFormationForm";
import { UPDATE_ENQUETE_REPONSE_SERVICE_PERSONNEL_FORMATION } from "./mutations";
import { ENQUETE_REPONSES_SERVICE_PERSONNEL_FORMATION } from "./queries";

export const EnqueteServicePersonnelFormation = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useContext(UserContext);

  const {
    enquete_reponse_ids: { personnel_formation_id },
  } = enqueteReponse;

  const { data, loading } = useQuery(
    ENQUETE_REPONSES_SERVICE_PERSONNEL_FORMATION,
    {
      variables: {
        id: personnel_formation_id,
      },
    }
  );

  const [updateEnquete] = useMutation(
    UPDATE_ENQUETE_REPONSE_SERVICE_PERSONNEL_FORMATION,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId },
        },
        {
          query: ENQUETE_REPONSES_SERVICE_PERSONNEL_FORMATION,
          variables: {
            id: personnel_formation_id,
          },
        },
      ],
    }
  );

  const personnelFormation = data
    ? data.enquete_reponses_service_personnel_formation_by_pk || {}
    : {};

  return loading ? null : (
    <EnqueteServicePersonnelFormationForm
      data={personnelFormation}
      section={section}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: personnel_formation_id,
            ...values,
          },
        });
      }}
    />
  );
};

export default EnqueteServicePersonnelFormation;
