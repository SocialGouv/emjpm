import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnquetePreposeModaliteExerciceInformationsForm } from "./EnquetePreposeModaliteExerciceInformationsForm";
import { UPDATE_ENQUETE_PREPOSE_INFORMATIONS } from "./mutations";
import { ENQUETE_PREPOSE_INFORMATIONS } from "./queries";

export const EnquetePreposeModaliteExerciceInformations = props => {
  const { goToNextPage, goToPrevPage, enqueteReponse } = props; /* mandataireId, enquete */
  const { enquete_reponses_modalites_exercice_id } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_PREPOSE_INFORMATIONS, {
    variables: {
      id: enquete_reponses_modalites_exercice_id
    }
  });

  const [sendEnqueteReponseInformations] = useMutation(UPDATE_ENQUETE_PREPOSE_INFORMATIONS);

  return (
    <Box>
      <EnquetePreposeModaliteExerciceInformationsForm
        data={data ? data.enquete_reponses_modalites_exercice_by_pk || {} : {}}
        goToPrevPage={goToPrevPage}
        loading={loading}
        handleSubmit={async values => {
          await sendEnqueteReponseInformations({
            variables: {
              id: enquete_reponses_modalites_exercice_id,
              departement: values.departement || null,
              region: values.region || null,
              raison_sociale: values.raison_sociale || null,
              personnalite_juridique_etablissement:
                values.personnalite_juridique_etablissement || null,
              activite_personne_physique: values.activite_personne_physique || null,
              activite_service: values.activite_service || null,
              total_mesures_etablissements: values.total_mesures_etablissements || null,
              etablissement_personne_morale: values.etablissement_personne_morale || null,
              etablissement_convention_groupement:
                values.etablissement_convention_groupement || null
            }
          });
          await goToNextPage();
        }}
      />
    </Box>
  );
};

export default EnquetePreposeModaliteExerciceInformations;
