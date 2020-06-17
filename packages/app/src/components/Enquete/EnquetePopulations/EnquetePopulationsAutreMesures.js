import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_AUTRE } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_AUTRE } from "./queries";
import { removeAttributesPrefix } from "./removeAttributesPrefix.service";

export const EnquetePopulationsAutreMesures = (props) => {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    userId,
    enquete: { id: enqueteId },
    section,
    step,
  } = props;
  const {
    enquete_reponse_ids: { populations_id },
  } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_REPONSE_POPULATIONS_AUTRE, {
    variables: {
      id: populations_id,
    },
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_POPULATIONS_AUTRE, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_REPONSE_POPULATIONS_AUTRE,
        variables: { id: populations_id },
      },
    ],
  });

  const populations = data ? data.enquete_reponses_populations_by_pk || {} : {};
  const reponsePopulations = useMemo(() => removeAttributesPrefix(populations, "autre_mesures_"), [
    populations,
  ]);

  return (
    !loading && (
      <Box>
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
          title={"Autre mesures"}
        />
      </Box>
    )
  );
};

export default EnquetePopulationsAutreMesures;
