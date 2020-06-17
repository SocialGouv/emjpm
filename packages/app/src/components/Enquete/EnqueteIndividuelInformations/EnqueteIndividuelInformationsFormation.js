import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelInformationsFormationForm } from "./EnqueteIndividuelInformationsFormationForm";
import { UPDATE_ENQUETE_INFORMATIONS_FORMATION } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION } from "./queries";

export const EnqueteIndividuelInformationsFormation = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    userId,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;
  const {
    enquete_reponse_ids: { agrements_formations_id },
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION, {
    variables: {
      id: agrements_formations_id,
    },
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INFORMATIONS_FORMATION, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION,
        variables: { id: agrements_formations_id },
      },
    ],
  });

  return loading ? null : (
    <EnqueteIndividuelInformationsFormationForm
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      data={data ? data.enquete_reponses_agrements_formations_by_pk || {} : {}}
      section={section}
      step={step}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: agrements_formations_id,
            ...values,
          },
        });
      }}
    />
  );
};

export default EnqueteIndividuelInformationsFormation;
