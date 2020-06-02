import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useMemo } from "react";
import { Box } from "rebass";

import { EnqueteActiviteForm } from "./EnqueteActiviteForm";
import { UPDATE_ENQUETE_ACTIVITE_TUTELLE } from "./mutations";
import { ENQUETE_TUTELLE } from "./queries";

const PREFIX = "tutelle";

export const EnqueteActiviteTutelle = props => {
  const { goToPrevPage, goToNextPage, enqueteReponse } = props;
  const { enquete_reponses_activite_id } = enqueteReponse;

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_TUTELLE, {
    refetchQueries: [
      {
        query: ENQUETE_TUTELLE,
        variables: {
          id: enquete_reponses_activite_id
        }
      }
    ]
  });
  const { data, loading } = useQuery(ENQUETE_TUTELLE, {
    variables: {
      id: enquete_reponses_activite_id
    }
  });

  const normalizedData = useMemo(() => {
    const r = data ? data.enquete_reponses_activite_by_pk || {} : {};

    return {
      etablissementDebutAnnee: r[`${PREFIX}_etablissement_debut_annee`],
      etablissementFinAnnee: r[`${PREFIX}_etablissement_fin_annee`],
      domicileDebutAnnee: r[`${PREFIX}_domicile_debut_annee`],
      domicileFinAnnee: r[`${PREFIX}_domicile_fin_annee`],
      etablissementMesuresNouvelles: r[`${PREFIX}_etablissement_mesures_nouvelles`],
      etablissementSortieMesures: r[`${PREFIX}_etablissement_sortie_mesures`],
      domicileMesuresNouvelles: r[`${PREFIX}_domicile_mesures_nouvelles`],
      domicileSortieMesures: r[`${PREFIX}_domicile_sortie_mesures`]
    };
  }, [data]);

  return (
    <Box>
      <EnqueteActiviteForm
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
        title="Tutelle"
      />
    </Box>
  );
};

export default EnqueteActiviteTutelle;
