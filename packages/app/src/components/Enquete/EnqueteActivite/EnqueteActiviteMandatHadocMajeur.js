import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { EnqueteActiviteMesuresForm } from "./common";
import { UPDATE_ENQUETE_MANDAT_ADHOC_MAJEUR } from "./mutations";
import { ENQUETE_MANDAT_ADHOC_MAJEUR } from "./queries";

const PREFIX = "mandat_adhoc_majeur";

export const EnqueteActiviteMandatHadocMajeur = props => {
  const { goToPrevPage, goToNextPage, enqueteReponse } = props;
  const { enquete_reponses_activite_id } = enqueteReponse;
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_MANDAT_ADHOC_MAJEUR, {
    refetchQueries: [
      {
        query: ENQUETE_MANDAT_ADHOC_MAJEUR,
        variables: {
          id: enquete_reponses_activite_id
        }
      }
    ]
  });
  const { data, loading } = useQuery(ENQUETE_MANDAT_ADHOC_MAJEUR, {
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
        title="Mandat ad hoc majeur"
      />
    </Box>
  );
};

export default EnqueteActiviteMandatHadocMajeur;
