import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { EnqueteActiviteForm } from "./EnqueteActiviteForm";
import { UPDATE_ENQUETE_ACTIVITE_CURATELLE_BIENS } from "./mutations";
import { ENQUETE_CURATELLE_BIENS } from "./queries";

export const EnqueteActiviteCuratelleBiens = props => {
  const { goToPrevPage, goToNextPage, enquete } = props;
  const { enqueteReponseId } = enquete;
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_CURATELLE_BIENS);
  const { data, loading } = useQuery(ENQUETE_CURATELLE_BIENS, {
    variables: {
      id: enqueteReponseId
    }
  });

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }

  const { enquete_reponses } = data;
  const [
    {
      activite_curatelle_biens_domicile_debut_annee,
      activite_curatelle_biens_domicile_fin_annee,
      activite_curatelle_biens_etablissement_debut_annee,
      activite_curatelle_biens_etablissement_fin_annee
    }
  ] = enquete_reponses;

  return (
    <Box>
      <EnqueteActiviteForm
        nbMesureEtablissementDebutAnnee={activite_curatelle_biens_etablissement_debut_annee}
        nbMesureEtablissementFinAnnee={activite_curatelle_biens_etablissement_fin_annee}
        nbMesureDomicileDebutAnnee={activite_curatelle_biens_domicile_debut_annee}
        nbMesureDomicileFinAnnee={activite_curatelle_biens_domicile_fin_annee}
        handleSubmit={async values => {
          const {
            nbMesureDomicileDebutAnnee,
            nbMesureDomicileFinAnnee,
            nbMesureEtablissementDebutAnnee,
            nbMesureEtablissementFinAnnee
          } = values;
          await updateEnquete({
            variables: {
              id: enqueteReponseId,
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
