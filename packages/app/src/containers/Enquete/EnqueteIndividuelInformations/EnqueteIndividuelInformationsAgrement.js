import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

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
  const { data, loading } = useQuery(
    ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS,
    {
      variables: {
        id: enqueteReponse.id,
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
        variables: { id: enqueteReponse.id },
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
    />
  );
}

export default EnqueteIndividuelInformationsAgrement;
