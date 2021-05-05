import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePreposeModaliteExerciceInformationsForm } from "./EnquetePreposeModaliteExerciceInformationsForm";
import { UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_INFORMATIONS } from "./mutations";
import { ENQUETE_PREPOSE_INFORMATIONS } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

export function EnquetePreposeModaliteExerciceInformations(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();
  const { data, loading, error } = useQuery(ENQUETE_PREPOSE_INFORMATIONS, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const [
    sendEnqueteReponseInformations,
    { loading: loading2, error: error2 },
  ] = useMutation(UPDATE_ENQUETE_PREPOSE_MODALITE_EXERCICE_INFORMATIONS, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId, reponseId: enqueteReponse.id },
      },
      {
        query: ENQUETE_PREPOSE_INFORMATIONS,
        variables: { id: enqueteReponse.id },
      },
    ],
  });
  useQueryReady(loading2, error2);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <EnquetePreposeModaliteExerciceInformationsForm
      data={data ? data.enquete_reponses_modalites_exercice[0] : undefined}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      loading={loading}
      step={step}
      onSubmit={async (values) => {
        await sendEnqueteReponseInformations({
          variables: {
            id: enqueteReponse.id,
            ...values,
          },
        });
      }}
      enquete={props.enquete}
      currentStep={props.currentStep}
      sections={props.sections}
    />
  );
}

export default EnquetePreposeModaliteExerciceInformations;
