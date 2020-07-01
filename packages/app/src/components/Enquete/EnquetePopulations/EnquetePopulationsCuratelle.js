import React, { useContext, useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";

import { UserContext } from "../../UserContext";
import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_CURATELLE } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_CURATELLE } from "./queries";
import { removeAttributesPrefix } from "./removeAttributesPrefix.service";

export const EnquetePopulationsCuratelle = (props) => {
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

  const { data, loading } = useQuery(ENQUETE_REPONSE_POPULATIONS_CURATELLE, {
    variables: {
      id: populations_id,
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
        variables: { id: populations_id },
      },
    ],
  });

  const populations = data ? data.enquete_reponses_populations_by_pk || {} : {};
  const reponsePopulations = useMemo(() => removeAttributesPrefix(populations, "curatelle_"), [
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
      title={"Curatelle"}
    />
  );
};

export default EnquetePopulationsCuratelle;
