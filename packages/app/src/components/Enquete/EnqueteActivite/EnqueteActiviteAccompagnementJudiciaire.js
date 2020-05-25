import React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { EnqueteActiviteForm } from "./EnqueteActiviteForm";
import { UPDATE_ENQUETE_ACTIVITE_ACCOMPAGNEMENT_JUDICIAIRE } from "./mutations";
import { ENQUETE_ACCOMPAGNEMENT_JUDICIAIRE } from "./queries";

export const EnqueteActiviteAccompagnementJudiciaire = props => {
  const { goToPrevPage, goToNextPage, enqueteReponse } = props;
  const { enquete_reponses_activite_id } = enqueteReponse;

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_ACCOMPAGNEMENT_JUDICIAIRE, {
    refetchQueries: [
      {
        query: ENQUETE_ACCOMPAGNEMENT_JUDICIAIRE,
        variables: {
          id: enquete_reponses_activite_id
        }
      }
    ]
  });
  const { data, loading } = useQuery(ENQUETE_ACCOMPAGNEMENT_JUDICIAIRE, {
    variables: {
      id: enquete_reponses_activite_id
    }
  });

  const {
    accompagnement_judiciaire_domicile_debut_annee,
    accompagnement_judiciaire_domicile_fin_annee,
    accompagnement_judiciaire_etablissement_debut_annee,
    accompagnement_judiciaire_etablissement_fin_annee
  } = data ? data.enquete_reponses_activite_by_pk || {} : {};

  return (
    <Box>
      <EnqueteActiviteForm
        loading={loading}
        data={{
          nbMesureEtablissementDebutAnnee: accompagnement_judiciaire_etablissement_debut_annee,
          nbMesureEtablissementFinAnnee: accompagnement_judiciaire_etablissement_fin_annee,
          nbMesureDomicileDebutAnnee: accompagnement_judiciaire_domicile_debut_annee,
          nbMesureDomicileFinAnnee: accompagnement_judiciaire_domicile_fin_annee
        }}
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
        title="Accompagnement judiciaire"
      />
    </Box>
  );
};

export default EnqueteActiviteAccompagnementJudiciaire;
