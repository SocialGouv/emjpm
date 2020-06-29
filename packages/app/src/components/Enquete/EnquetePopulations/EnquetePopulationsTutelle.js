import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";

import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_TUTELLE } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_TUTELLE } from "./queries";
import { removeAttributesPrefix } from "./removeAttributesPrefix.service";

export const EnquetePopulationsTutelle = (props) => {
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

  const { data, loading } = useQuery(ENQUETE_REPONSE_POPULATIONS_TUTELLE, {
    variables: {
      id: populations_id,
    },
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_POPULATIONS_TUTELLE, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, reponseId: enqueteReponse.id },
      },
      {
        query: ENQUETE_REPONSE_POPULATIONS_TUTELLE,
        variables: { id: populations_id },
      },
    ],
  });

  const populations = data ? data.enquete_reponses_populations_by_pk || {} : {};
  const reponsePopulations = useMemo(() => removeAttributesPrefix(populations, "tutelle_"), [
    populations,
  ]);

  return (
    <EnquetePopulationsForm
      loading={loading}
      data={reponsePopulations}
      section={section}
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
      title={"Tutelle"}
    />
  );
};

export default EnquetePopulationsTutelle;
