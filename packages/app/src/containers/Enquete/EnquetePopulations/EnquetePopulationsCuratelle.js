import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_CURATELLE } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_CURATELLE } from "./queries";
import { removeAttributesPrefix } from "./removeAttributesPrefix.service";

export function EnquetePopulationsCuratelle(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    enquete: { id: enqueteId },
    section,
    step,
  } = props;

  const { id: userId } = useUser();

  const { data, loading } = useQuery(ENQUETE_REPONSE_POPULATIONS_CURATELLE, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_POPULATIONS_CURATELLE, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_REPONSE_POPULATIONS_CURATELLE,
        variables: { id: enqueteReponse.id },
      },
    ],
  });

  const populations = useMemo(
    () => (data ? data.enquete_reponses_populations[0] || {} : {}),
    [data]
  );
  const reponsePopulations = useMemo(
    () => removeAttributesPrefix(populations, "curatelle_"),
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
            id: enqueteReponse.id,
            ...values,
          },
        });
      }}
      enqueteContext={enqueteContext}
      dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
      title={"Curatelle"}
      enquete={props.enquete}
    />
  );
}

export default EnquetePopulationsCuratelle;
