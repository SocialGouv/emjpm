import { useMutation, useQuery } from "@apollo/client";
import { useContext } from "react";

import { UserContext } from "~/components/UserContext";

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
  const {
    enquete_reponse_ids: { financement_id },
  } = enqueteReponse;
  const { id: userId } = useContext(UserContext);
  const { data, loading } = useQuery(ENQUETE_REPONSES_FINANCEMENT, {
    variables: {
      id: financement_id,
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
          id: financement_id,
        },
      },
    ],
  });
  const financement = data ? data.enquete_reponses_financement_by_pk || {} : {};

  return (
    <EnquetePreposeFinancementForm
      data={financement}
      step={step}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      onSubmit={async (values) => {
        await updateFinancement({
          variables: {
            id: financement_id,
            ...values,
          },
        });
      }}
      loading={loading}
    />
  );
}

export default EnquetePreposeFinancement;
