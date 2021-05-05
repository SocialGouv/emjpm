import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePreposeFinancementForm } from "./EnquetePreposeFinancementForm";
import { UPDATE_ENQUETE_REPONSES_FINANCEMENT } from "./mutations";
import { ENQUETE_REPONSES_FINANCEMENT } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

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
  const [updateFinancement, { loading: loading2, error: error2 }] = useMutation(
    UPDATE_ENQUETE_REPONSES_FINANCEMENT,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_REPONSES_FINANCEMENT,
          variables: {
            id: enqueteReponse.id,
          },
        },
      ],
    }
  );
  useQueryReady(loading2, error2);

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
      currentStep={props.currentStep}
      sections={props.sections}
    />
  );
}

export default EnquetePreposeFinancement;
