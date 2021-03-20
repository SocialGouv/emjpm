import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePreposePrestationsSocialesRepartitionPersonnesForm } from "./EnquetePreposePrestationsSocialesRepartitionPersonnesForm";
import { UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_REPARTITION } from "./mutations";
import { ENQUETE_PREPOSE_PRESTATIONS_SOCIALES } from "./queries";

export function EnquetePreposePrestationsSocialesRepartitionPersonnes(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();
  const { data, loading } = useQuery(ENQUETE_PREPOSE_PRESTATIONS_SOCIALES, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const [updateEnquete] = useMutation(
    UPDATE_ENQUETE_PREPOSE_PRESTATIONS_SOCIALES_REPARTITION,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId },
        },
        {
          query: ENQUETE_PREPOSE_PRESTATIONS_SOCIALES,
          variables: {
            id: enqueteReponse.id,
          },
        },
      ],
    }
  );

  const prestationsSociales = data
    ? data.enquete_reponses_prepose_prestations_sociales[0] || {}
    : {};

  return (
    <EnquetePreposePrestationsSocialesRepartitionPersonnesForm
      data={prestationsSociales}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: enqueteReponse.id,
            ...values,
          },
        });
      }}
    />
  );
}

export default EnquetePreposePrestationsSocialesRepartitionPersonnes;
