import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";

import { UserContext } from "../../UserContext";
import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelInformationsAgrementForm } from "./EnqueteIndividuelInformationsAgrementForm";
import { UPDATE_ENQUETE_INFORMATIONS_AGREMENTS } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS } from "./queries";

export const EnqueteIndividuelInformationsAgrement = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;
  const {
    enquete_reponse_ids: { agrements_formations_id },
  } = enqueteReponse;
  const { id: userId } = useContext(UserContext);
  const { data, loading } = useQuery(
    ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS,
    {
      variables: {
        id: agrements_formations_id,
      },
    }
  );

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INFORMATIONS_AGREMENTS, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS,
        variables: { id: agrements_formations_id },
      },
    ],
  });

  const agrements = data
    ? data.enquete_reponses_agrements_formations_by_pk
    : undefined;
  return loading ? null : (
    <EnqueteIndividuelInformationsAgrementForm
      data={agrements}
      section={section}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
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

export default EnqueteIndividuelInformationsAgrement;
