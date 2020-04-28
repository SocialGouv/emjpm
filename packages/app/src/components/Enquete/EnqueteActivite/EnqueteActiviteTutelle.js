import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnqueteActiviteForm } from "./EnqueteActiviteForm";
import { UPDATE_ENQUETE_ACTIVITE_TUTELLE } from "./mutations";
import { ENQUETE_TUTELLE } from "./queries";

export const EnqueteActiviteTutelle = props => {
  const { goToPrevPage, goToNextPage, enquete } = props;
  const { enqueteReponseId } = enquete;

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_TUTELLE);
  const { data, loading } = useQuery(ENQUETE_TUTELLE, {
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
      activite_tutelle_domicile_debut_annee,
      activite_tutelle_domicile_fin_annee,
      activite_tutelle_etablissement_debut_annee,
      activite_tutelle_etablissement_fin_annee
    }
  ] = enquete_reponses;

  return (
    <Box>
      <EnqueteActiviteForm
        nbMesureEtablissementDebutAnnee={activite_tutelle_etablissement_debut_annee}
        nbMesureEtablissementFinAnnee={activite_tutelle_etablissement_fin_annee}
        nbMesureDomicileDebutAnnee={activite_tutelle_domicile_debut_annee}
        nbMesureDomicileFinAnnee={activite_tutelle_domicile_fin_annee}
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
        title="Tutelle"
      />
    </Box>
  );
};

export default EnqueteActiviteTutelle;
