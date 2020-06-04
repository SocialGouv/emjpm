import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { ENQUETE_MANDATAIRE_INDIVIDUEL } from "../EnqueteIndividuel/queries";
import { EnqueteActiviteMesuresForm } from "./common";
import { UPDATE_ENQUETE_SUBROGE_TUTEUR_CREATEUR } from "./mutations";
import { ENQUETE_SUBROGE_TUTEUR_CREATEUR } from "./queries";

const PREFIX = "subroge_tuteur_createur";

export const EnqueteActiviteSubrogeTuteurCreateur = props => {
  const {
    goToPrevPage,
    goToNextPage,
    enqueteReponse,
    section,
    step,
    mandataireId,
    enquete: { id: enqueteId }
  } = props;
  const { enquete_reponses_activite_id } = enqueteReponse;
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_SUBROGE_TUTEUR_CREATEUR, {
    refetchQueries: [
      {
        query: ENQUETE_MANDATAIRE_INDIVIDUEL,
        variables: { enqueteId, mandataireId }
      },
      {
        query: ENQUETE_SUBROGE_TUTEUR_CREATEUR,
        variables: {
          id: enquete_reponses_activite_id
        }
      }
    ]
  });
  const { data, loading } = useQuery(ENQUETE_SUBROGE_TUTEUR_CREATEUR, {
    variables: {
      id: enquete_reponses_activite_id
    }
  });

  const normalizedData = useMemo(() => {
    const r = data ? data.enquete_reponses_activite_by_pk || {} : {};

    return {
      debutAnnee: r[`${PREFIX}_debut_annee`],
      finAnnee: r[`${PREFIX}_fin_annee`],
      mesuresNouvelles: r[`${PREFIX}_mesures_nouvelles`],
      sortieMesures: r[`${PREFIX}_sortie_mesures`]
    };
  }, [data]);

  return (
    <Box>
      <EnqueteActiviteMesuresForm
        loading={loading}
        data={normalizedData}
        section={section}
        step={step}
        handleSubmit={async values => {
          await updateEnquete({
            variables: {
              id: enquete_reponses_activite_id,
              ...values
            }
          });
          await goToNextPage();
        }}
        goToPrevPage={goToPrevPage}
        title="Subrogé tuteur ou curateur"
      />
    </Box>
  );
};

export default EnqueteActiviteSubrogeTuteurCreateur;
