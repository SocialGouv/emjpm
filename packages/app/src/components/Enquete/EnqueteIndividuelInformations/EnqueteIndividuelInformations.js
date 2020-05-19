import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnqueteIndividuelInformationsForm } from "./EnqueteIndividuelInformationsForm";
import { UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS } from "./mutations";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE } from "./queries";

export const EnqueteIndividuelInformations = props => {
  const { goToNextPage, goToPrevPage, enqueteReponse } = props;
  const { enquete_reponses_informations_mandataire_id } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE, {
    variables: {
      id: enquete_reponses_informations_mandataire_id
    }
  });
  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS, {
    refetchQueries: [
      {
        query: ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE,
        variables: { id: enquete_reponses_informations_mandataire_id }
      }
    ]
  });

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }

  const { enquete_reponses_informations_mandataire_by_pk: informations = {} } = data;

  return (
    <EnqueteIndividuelInformationsForm
      data={informations}
      goToPrevPage={goToPrevPage}
      handleSubmit={async values => {
        await updateEnquete({
          variables: {
            id: enquete_reponses_informations_mandataire_id,
            anciennete: values.anciennete ? `${values.anciennete}` : null,
            benevole: values.benevole,
            estimation_etp: values.estimation_etp || null,
            forme_juridique: values.forme_juridique ? values.forme_juridique : null,
            local_professionnel: values.local_professionnel,
            secretaire_specialise_etp: values.secretaire_specialise_etp
              ? `${values.secretaire_specialise_etp}`
              : null
          }
        });
        await goToNextPage();
      }}
    />
  );
};

export default EnqueteIndividuelInformations;
