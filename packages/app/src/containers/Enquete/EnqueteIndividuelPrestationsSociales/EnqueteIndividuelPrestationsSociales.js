import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelPrestationsSocialesForm } from "./EnqueteIndividuelPrestationsSocialesForm";
import { UPDATE_ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES } from "./mutations";
import { ENQUETE_REPONSE_PRESTATIONS_SOCIALES } from "./queries";

export function EnqueteIndividuelPrestationsSociales(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    enquete: { id: enqueteId },
    section,
    step,
  } = props;

  const { id: userId } = useUser();
  const { data, loading } = useQuery(ENQUETE_REPONSE_PRESTATIONS_SOCIALES, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const [updateEnquete] = useMutation(
    UPDATE_ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_REPONSE_PRESTATIONS_SOCIALES,
          variables: { id: enqueteReponse.id },
        },
      ],
    }
  );

  const prestationsSociales = data
    ? data.enquete_reponses_prestations_sociales[0] || {}
    : {};
  return (
    <EnqueteIndividuelPrestationsSocialesForm
      loading={loading}
      data={prestationsSociales}
      section={section}
      sections={props.sections}
      currentStep={props.currentStep}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: enqueteReponse.id,
            ...values,
          },
        });
      }}
      enquete={props.enquete}
    />
  );
}

export default EnqueteIndividuelPrestationsSociales;
