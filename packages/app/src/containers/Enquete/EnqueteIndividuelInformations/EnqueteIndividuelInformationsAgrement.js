import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";
import useQueryReady from "../../../hooks/useQueryReady";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelInformationsAgrementForm } from "./EnqueteIndividuelInformationsAgrementForm";
import { UPDATE_ENQUETE_INFORMATIONS_AGREMENTS } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS } from "./queries";

export function EnqueteIndividuelInformationsAgrement(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();
  const { data, loading, error } = useQuery(
    ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS,
    {
      variables: {
        id: enqueteReponse.id,
      },
    }
  );

  const [updateEnquete, { loading: loading2, error: error2 }] = useMutation(
    UPDATE_ENQUETE_INFORMATIONS_AGREMENTS,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS,
          variables: { id: enqueteReponse.id },
        },
      ],
    }
  );
  useQueryReady(loading2, error2);

  const agrements = data
    ? data.enquete_reponses_agrements_formations[0]
    : undefined;

  if (!useQueryReady(loading, error)) {
    return null;
  }
  return (
    <EnqueteIndividuelInformationsAgrementForm
      data={agrements}
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

export default EnqueteIndividuelInformationsAgrement;
