import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { EnqueteActiviteForm } from "./EnqueteActiviteForm";
import { UPDATE_ENQUETE_ACTIVITE_ACCOMPAGNEMENT_JUDICIAIRE } from "./mutations";
import { ENQUETE_ACCOMPAGNEMENT_JUDICIAIRE } from "./queries";

export const EnqueteActiviteAccompagnementJudiciaire = props => {
  const { goToPrevPage, goToNextPage, enquete } = props;
  const { enqueteReponseId } = enquete;

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_ACCOMPAGNEMENT_JUDICIAIRE);
  const { data, loading } = useQuery(ENQUETE_ACCOMPAGNEMENT_JUDICIAIRE, {
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
      activite_accompagnement_judiciaire_domicile_debut_annee,
      activite_accompagnement_judiciaire_domicile_fin_annee,
      activite_accompagnement_judiciaire_etablissement_debut_annee,
      activite_accompagnement_judiciaire_etablissement_fin_annee
    }
  ] = enquete_reponses;

  return (
    <Box>
      <EnqueteActiviteForm
        nbMesureEtablissementDebutAnnee={
          activite_accompagnement_judiciaire_etablissement_debut_annee
        }
        nbMesureEtablissementFinAnnee={activite_accompagnement_judiciaire_etablissement_fin_annee}
        nbMesureDomicileDebutAnnee={activite_accompagnement_judiciaire_domicile_debut_annee}
        nbMesureDomicileFinAnnee={activite_accompagnement_judiciaire_domicile_fin_annee}
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
        title="Accompagnement judiciaire"
      />
    </Box>
  );
};

export default EnqueteActiviteAccompagnementJudiciaire;
