import { useContext, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { UserContext } from "~/containers/UserContext";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_SAUVEGARDE_JUSTICE } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE } from "./queries";
import { removeAttributesPrefix } from "./removeAttributesPrefix.service";

export function EnquetePopulationsSauvegardeJustice(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    enquete: { id: enqueteId },
    section,
    step,
  } = props;
  const {
    enquete_reponse_ids: { populations_id },
  } = enqueteReponse;
  const { id: userId } = useContext(UserContext);
  const { data, loading } = useQuery(
    ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE,
    {
      variables: {
        id: populations_id,
      },
    }
  );

  const [updateEnquete] = useMutation(
    UPDATE_ENQUETE_POPULATIONS_SAUVEGARDE_JUSTICE,
    {
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId },
        },
        {
          query: ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE,
          variables: { id: populations_id },
        },
      ],
    }
  );

  const populations = useMemo(
    () => (data ? data.enquete_reponses_populations_by_pk || {} : {}),
    [data]
  );
  const reponsePopulations = useMemo(
    () => removeAttributesPrefix(populations, "sauvegarde_justice_"),
    [populations]
  );

  return (
    <EnquetePopulationsForm
      loading={loading}
      data={reponsePopulations}
      section={section}
      sections={props.sections}
      currentStep={props.currentStep}
      step={step}
      onSubmit={async (values) => {
        await updateEnquete({
          variables: {
            id: populations_id,
            ...values,
          },
        });
      }}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      title={"Sauvegarde de justice"}
    />
  );
}

export default EnquetePopulationsSauvegardeJustice;