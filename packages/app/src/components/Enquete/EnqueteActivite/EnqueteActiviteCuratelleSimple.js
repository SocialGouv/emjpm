import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnqueteActiviteForm } from "./EnqueteActiviteForm";
import { UPDATE_ENQUETE_ACTIVITE_CURATELLE_SIMPLE } from "./mutations";
import { ENQUETE_CURATELLE_SIMPLE } from "./queries";

export const EnqueteActiviteCuratelleSimple = props => {
  const { goToPrevPage, goToNextPage, enqueteReponse } = props;
  const { enquete_reponses_activite_id } = enqueteReponse;
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_ACTIVITE_CURATELLE_SIMPLE, {
    refetchQueries: [
      {
        query: ENQUETE_CURATELLE_SIMPLE,
        variables: {
          id: enquete_reponses_activite_id
        }
      }
    ]
  });

  const { data, loading } = useQuery(ENQUETE_CURATELLE_SIMPLE, {
    variables: {
      id: enquete_reponses_activite_id
    }
  });

  const {
    curatelle_simple_domicile_debut_annee,
    curatelle_simple_domicile_fin_annee,
    curatelle_simple_etablissement_debut_annee,
    curatelle_simple_etablissement_fin_annee
  } = data ? data.enquete_reponses_activite_by_pk || {} : {};

  return (
    <Box>
      <EnqueteActiviteForm
        loading={loading}
        data={{
          nbMesureEtablissementDebutAnnee: curatelle_simple_etablissement_debut_annee,
          nbMesureEtablissementFinAnnee: curatelle_simple_etablissement_fin_annee,
          nbMesureDomicileDebutAnnee: curatelle_simple_domicile_debut_annee,
          nbMesureDomicileFinAnnee: curatelle_simple_domicile_fin_annee
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
        title="Curatelle simple"
      />
    </Box>
  );
};

export default EnqueteActiviteCuratelleSimple;
