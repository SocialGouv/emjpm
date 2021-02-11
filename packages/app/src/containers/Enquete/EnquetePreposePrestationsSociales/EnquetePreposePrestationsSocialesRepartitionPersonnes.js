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
  const {
    enquete_reponse_ids: { prestations_sociales_id },
  } = enqueteReponse;
  const { id: userId } = useUser();
  const { data, loading } = useQuery(ENQUETE_PREPOSE_PRESTATIONS_SOCIALES, {
    variables: {
      id: prestations_sociales_id,
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
            id: prestations_sociales_id,
          },
        },
      ],
    }
  );

  const prestationsSociales = data
    ? data.enquete_reponses_prepose_prestations_sociales_by_pk || {}
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
            id: prestations_sociales_id,
            ...values,
          },
        });
      }}
    />
  );
}

export default EnquetePreposePrestationsSocialesRepartitionPersonnes;
