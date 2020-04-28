import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnqueteActiviteForm } from "./EnqueteActiviteForm";
import { UPDATE_ENQUETE_ACTIVITE_CURATELLE_SIMPLE } from "./mutations";
import { ENQUETE_CURATELLE_SIMPLE } from "./queries";

export const EnqueteActiviteCuratelleSimple = props => {
  const { goToPrevPage, goToNextPage, enquete } = props;
  const { enqueteReponseId } = enquete;
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_CURATELLE_SIMPLE);
  const { data, loading } = useQuery(ENQUETE_CURATELLE_SIMPLE, {
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
      id,
      activite_curatelle_simple_domicile_debut_annee,
      activite_curatelle_simple_domicile_fin_annee,
      activite_curatelle_simple_etablissement_debut_annee,
      activite_curatelle_simple_etablissement_fin_annee
    }
  ] = enquete_reponses;

  return (
    <Box>
      <EnqueteActiviteForm
        nbMesureEtablissementDebutAnnee={activite_curatelle_simple_etablissement_debut_annee}
        nbMesureEtablissementFinAnnee={activite_curatelle_simple_etablissement_fin_annee}
        nbMesureDomicileDebutAnnee={activite_curatelle_simple_domicile_debut_annee}
        nbMesureDomicileFinAnnee={activite_curatelle_simple_domicile_fin_annee}
        handleSubmit={async values => {
          const {
            nbMesureDomicileDebutAnnee,
            nbMesureDomicileFinAnnee,
            nbMesureEtablissementDebutAnnee,
            nbMesureEtablissementFinAnnee
          } = values;
          await updateEnquete({
            variables: {
              id,
              etablissementDebutAnnee: nbMesureEtablissementDebutAnnee || null,
              etablissementFinAnnee: nbMesureEtablissementFinAnnee || null,
              domicileDebutAnnee: nbMesureDomicileDebutAnnee || null,
              domicileFinAnnee: nbMesureDomicileFinAnnee || null
            }
          });
          await goToNextPage();
        }}
        goToPrevPage={goToPrevPage}
        title="Curatelle simple"
      />
    </Box>
  );
};

export default EnqueteActiviteCuratelleSimple;
