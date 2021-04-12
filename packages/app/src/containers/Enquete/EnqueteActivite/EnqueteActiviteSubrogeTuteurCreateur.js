import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Box } from "rebass";

import useUser from "~/hooks/useUser";

import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { EnqueteActiviteMesuresForm } from "./common";
import { UPDATE_ENQUETE_SUBROGE_TUTEUR_CREATEUR } from "./mutations";
import { ENQUETE_SUBROGE_TUTEUR_CREATEUR } from "./queries";

const PREFIX = "subroge_tuteur_createur";

export function EnqueteActiviteSubrogeTuteurCreateur(props) {
  const {
    enqueteContext,
    dispatchEnqueteContextEvent,
    enqueteReponse,
    section,
    step,
    enquete: { id: enqueteId },
  } = props;

  const { id: userId } = useUser();

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_SUBROGE_TUTEUR_CREATEUR, {
    refetchQueries: [
      {
        query: ENQUETE_WITH_REPONSE_STATUS,
        variables: { enqueteId, userId },
      },
      {
        query: ENQUETE_SUBROGE_TUTEUR_CREATEUR,
        variables: {
          id: enqueteReponse.id,
        },
      },
    ],
  });
  const { data, loading } = useQuery(ENQUETE_SUBROGE_TUTEUR_CREATEUR, {
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
        title="Subrogé tuteur ou curateur"
        enquete={props.enquete}
      />
    </Box>
  );
}

export default EnqueteActiviteSubrogeTuteurCreateur;
