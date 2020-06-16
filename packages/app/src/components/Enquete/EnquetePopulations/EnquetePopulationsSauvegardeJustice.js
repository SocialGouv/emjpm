import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { ENQUETE_REPONSE_STATUS } from "../queries";
import { EnquetePopulationsForm } from "./EnquetePopulationsForm";
import { UPDATE_ENQUETE_POPULATIONS_SAUVEGARDE_JUSTICE } from "./mutations";
import { ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE } from "./queries";
import { removeAttributesPrefix } from "./removeAttributesPrefix.service";

export const EnquetePopulationsSauvegardeJustice = (props) => {
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

  const { data, loading } = useQuery(ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE, {
    variables: {
      id: populations_id,
    },
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_POPULATIONS_SAUVEGARDE_JUSTICE, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_REPONSE_POPULATIONS_SAUVEGARDE_JUSTICE,
        variables: { id: populations_id },
      },
    ],
  });

  const populations = data ? data.enquete_reponses_populations_by_pk || {} : {};
  const reponsePopulations = useMemo(
    () => removeAttributesPrefix(populations, "sauvegarde_justice_"),
    [populations]
  );

  return (
    !loading && (
      <Box>
        <EnquetePopulationsForm
          loading={loading}
          data={reponsePopulations}
          section={section}
          step={step}
          onSubmit={async (values) => {
            const data = Object.keys(values).reduce((acc, key) => {
              if (values[key] !== "") {
                return {
                  ...acc,
                  [key]: parseInt(values[key], 10),
                };
              }
              return acc;
            }, {});

            await updateEnquete({
              variables: {
                id: populations_id,
                ...data,
              },
            });
          }}
          enqueteContext={enqueteContext}
          dispatchEnqueteContextEvent={dispatchEnqueteContextEvent}
          title={"Sauvegarde de justice"}
        />
      </Box>
    )
  );
};

export default EnquetePopulationsSauvegardeJustice;
