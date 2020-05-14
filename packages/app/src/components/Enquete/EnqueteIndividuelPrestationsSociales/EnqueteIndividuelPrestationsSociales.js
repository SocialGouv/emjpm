import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnqueteIndividuelPrestationsSocialesForm } from "./EnqueteIndividuelPrestationsSocialesForm";
import { UPDATE_ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES } from "./mutations";
import { ENQUETE_REPONSE_PRESTATIONS_SOCIALES } from "./queries";

export const EnqueteIndividuelPrestationsSociales = props => {
  const { goToNextPage, goToPrevPage, enqueteReponse } = props;
  const { enquete_reponses_prestations_sociale_id } = enqueteReponse;

  const { data, loading } = useQuery(ENQUETE_REPONSE_PRESTATIONS_SOCIALES, {
    variables: {
      id: enquete_reponses_prestations_sociale_id
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_PRESTATIONS_SOCIALES,
        variables: { id: enquete_reponses_prestations_sociale_id }
      }
    ]
  });

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }

  const { enquete_reponses_prestations_sociales_by_pk: prestationSociales = {} } = data;

  return (
    <EnqueteIndividuelPrestationsSocialesForm
      data={prestationSociales}
      goToPrevPage={goToPrevPage}
      handleSubmit={async values => {
        await updateEnquete({
          variables: {
            id: enquete_reponses_prestations_sociale_id,
            aah: values.aah || null,
            pch: values.pch || null,
            asi: values.asi || null,
            rsa: values.rsa || null,
            als: values.als || null,
            aspa: values.aspa || null,
            apa: values.apa || null
          }
        });
        await goToNextPage();
      }}
    />
  );
};

export default EnqueteIndividuelPrestationsSociales;
