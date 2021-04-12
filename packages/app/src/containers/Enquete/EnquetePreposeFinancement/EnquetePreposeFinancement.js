import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePreposeFinancementForm } from "./EnquetePreposeFinancementForm";
import { UPDATE_ENQUETE_REPONSES_FINANCEMENT } from "./mutations";
import { ENQUETE_REPONSES_FINANCEMENT } from "./queries";

export function EnquetePreposeFinancement(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();
  const { data, loading } = useQuery(ENQUETE_REPONSES_FINANCEMENT, {
    variables: {
      id: enqueteReponse.id,
    },
  });
  const [updateFinancement] = useMutation(UPDATE_ENQUETE_REPONSES_FINANCEMENT, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_REPONSES_FINANCEMENT,
        variables: {
          id: enqueteReponse.id,
        },
      },
    ],
  });
  const financement = data ? data.enquete_reponses_financement[0] || {} : {};

  return (
    <EnquetePreposeFinancementForm
      data={financement}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      onSubmit={async (values) => {
        await updateFinancement({
          variables: {
            id: enqueteReponse.id,
            ...values,
          },
        });
      }}
      loading={loading}
      enquete={props.enquete}
    />
  );
}

export default EnquetePreposeFinancement;
