import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Box } from "rebass";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteActiviteMesuresForm } from "./common";
import { UPDATE_ENQUETE_SAUVEGARDE_JUSTICE } from "./mutations";
import { ENQUETE_SAUVEGARDE_JUSTICE } from "./queries";

const PREFIX = "sauvegarde_justice";

export function EnqueteActiviteSauvegardeJustice(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_SAUVEGARDE_JUSTICE, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_SAUVEGARDE_JUSTICE,
        variables: {
          id: enqueteReponse.id,
        },
      },
    ],
  });
  const { data, loading } = useQuery(ENQUETE_SAUVEGARDE_JUSTICE, {
    variables: {
      id: enqueteReponse.id,
    },
  });

  const normalizedData = useMemo(() => {
    const r = data ? data.enquete_reponses_activite[0] || {} : {};

    return {
      debutAnnee: r[`${PREFIX}_debut_annee`],
      finAnnee: r[`${PREFIX}_fin_annee`],
      mesuresNouvelles: r[`${PREFIX}_mesures_nouvelles`],
      sortieMesures: r[`${PREFIX}_sortie_mesures`],
    };
  }, [data]);

  return (
    <Box>
      <EnqueteActiviteMesuresForm
        loading={loading}
        data={normalizedData}
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
        title="Sauvegarde de justice"
      />
    </Box>
  );
}

export default EnqueteActiviteSauvegardeJustice;
