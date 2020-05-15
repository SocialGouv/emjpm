import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { EnqueteActiviteForm } from "./EnqueteActiviteForm";
import { UPDATE_ENQUETE_ACTIVITE_CURATELLE_BIENS } from "./mutations";
import { ENQUETE_CURATELLE_BIENS } from "./queries";

export const EnqueteActiviteCuratelleBiens = props => {
  const { goToPrevPage, goToNextPage, enqueteReponse } = props;
  const { enquete_reponses_activite_id } = enqueteReponse;

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_CURATELLE_BIENS, {
    refetchQueries: [
      {
        query: ENQUETE_CURATELLE_BIENS,
        variables: {
          id: enquete_reponses_activite_id
        }
      }
    ]
  });
  const { data, loading } = useQuery(ENQUETE_CURATELLE_BIENS, {
    variables: {
      id: enquete_reponses_activite_id
    }
  });

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }

  const { enquete_reponses_activite_by_pk: activite } = data;
  const {
    curatelle_biens_domicile_debut_annee,
    curatelle_biens_domicile_fin_annee,
    curatelle_biens_etablissement_debut_annee,
    curatelle_biens_etablissement_fin_annee
  } = activite;

  return (
    <Box>
      <EnqueteActiviteForm
        nbMesureEtablissementDebutAnnee={curatelle_biens_etablissement_debut_annee}
        nbMesureEtablissementFinAnnee={curatelle_biens_etablissement_fin_annee}
        nbMesureDomicileDebutAnnee={curatelle_biens_domicile_debut_annee}
        nbMesureDomicileFinAnnee={curatelle_biens_domicile_fin_annee}
        handleSubmit={async values => {
          const {
            nbMesureDomicileDebutAnnee,
            nbMesureDomicileFinAnnee,
            nbMesureEtablissementDebutAnnee,
            nbMesureEtablissementFinAnnee
          } = values;
          await updateEnquete({
            variables: {
              id: enquete_reponses_activite_id,
              etablissementDebutAnnee: nbMesureEtablissementDebutAnnee || null,
              etablissementFinAnnee: nbMesureEtablissementFinAnnee || null,
              domicileDebutAnnee: nbMesureDomicileDebutAnnee || null,
              domicileFinAnnee: nbMesureDomicileFinAnnee || null
            }
          });
          await goToNextPage();
        }}
        goToPrevPage={goToPrevPage}
        title="Tutelle ou curatelle aux biens"
      />
    </Box>
  );
};

export default EnqueteActiviteCuratelleBiens;
