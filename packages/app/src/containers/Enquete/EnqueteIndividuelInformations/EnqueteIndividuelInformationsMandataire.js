import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteIndividuelInformationsMandataireForm } from "./EnqueteIndividuelInformationsMandataireForm";
import { UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

export function EnqueteIndividuelInformationsMandataire(props) {
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
    ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE,
    {
      variables: {
        id: enqueteReponse.id,
      },
    }
  );

  const [updateEnquete, { loading: loading2, error: error2 }] = useMutation(
    UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId, reponseId: enqueteReponse.id },
        },
        {
          query: ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE,
          variables: { id: enqueteReponse.id },
        },
      ],
    }
  );
  useQueryReady(loading2, error2);

  const informations = data
    ? data.enquete_reponses_informations_mandataire[0] || {}
    : {};

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <EnqueteIndividuelInformationsMandataireForm
      data={informations}
      section={section}
      sections={props.sections}
      currentStep={props.currentStep}
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
      enquete={props.enquete}
    />
  );
}

export default EnqueteIndividuelInformationsMandataire;
