import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { ENQUETE_REPONSE_STATUS } from "../queries";
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
    enquete_reponse_ids: { informations_mandataire_id },
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS, {
    variables: {
      id: informations_mandataire_id,
    },
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INFORMATIONS_AGREMENTS, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, reponseId: enqueteReponse.id },
      },
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS,
        variables: { id: informations_mandataire_id },
      },
    ],
  });

  const agrements = data ? data.enquete_reponses_agrements_formations_by_pk : undefined;
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
            id: informations_mandataire_id,
            ...values,
          },
        });
      }}
    />
  );
};

export default EnqueteIndividuelInformationsAgrement;
