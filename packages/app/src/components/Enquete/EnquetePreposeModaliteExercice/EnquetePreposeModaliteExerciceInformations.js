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
              departement: values.departement,
              region: values.region,
              raison_sociale: values.raison_sociale
              // actions_information_tuteurs_familiaux: Int
              // $activite_personne_physique: Int
              // $activite_service: Int
              // $departement: String
              // $etablissement_convention_groupement: Int
              // $etablissement_personne_morale: Int
              // $etablissement_personne_morale: Int
              // $nombre_lits_journee_hospitalisation: Int
              // $personnalite_juridique_etablissement: String
              // $raison_sociale: String
              // $region: String
              // $total_mesures_etablissements: Int
            }
          });
          await goToNextPage();
        }}
      />
    </Box>
  );
};

export default EnquetePreposeModaliteExerciceInformations;
