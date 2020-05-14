import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnqueteActiviteForm } from "./EnqueteActiviteForm";
import { UPDATE_ENQUETE_ACTIVITE_TUTELLE } from "./mutations";
import { ENQUETE_TUTELLE } from "./queries";

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

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }
  const { enquete_reponses_activite_by_pk: activite } = data;
  const {
    tutelle_domicile_debut_annee,
    tutelle_domicile_fin_annee,
    tutelle_etablissement_debut_annee,
    tutelle_etablissement_fin_annee
  } = activite;

  return (
    <Box>
      <EnqueteActiviteForm
        nbMesureEtablissementDebutAnnee={tutelle_etablissement_debut_annee}
        nbMesureEtablissementFinAnnee={tutelle_etablissement_fin_annee}
        nbMesureDomicileDebutAnnee={tutelle_domicile_debut_annee}
        nbMesureDomicileFinAnnee={tutelle_domicile_fin_annee}
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
        title="Tutelle"
      />
    </Box>
  );
};

export default EnqueteActiviteTutelle;
