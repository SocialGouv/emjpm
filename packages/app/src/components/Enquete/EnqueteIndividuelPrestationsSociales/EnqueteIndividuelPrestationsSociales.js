import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnqueteIndividuelPrestationsSocialesForm } from "./EnqueteIndividuelPrestationsSocialesForm";
import { UPDATE_ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES } from "./mutations";
import { ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES } from "./queries";

export const EnqueteIndividuelPrestationsSociales = props => {
  const { goToNextPage, goToPrevPage, enquete } = props;
  const { enqueteIndividuelId } = enquete;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES, {
    variables: {
      id: enqueteIndividuelId
    }
  });

  const [updateEnquete] = useMutation(UPDATE_ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES, {
    refetchQueries: [
      { query: ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES, variables: { id: enqueteIndividuelId } }
    ]
  });

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }

  const { enquete_individuels_by_pk: prestationSociales = {} } = data;

  return (
    <EnqueteIndividuelPrestationsSocialesForm
      data={prestationSociales}
      goToPrevPage={goToPrevPage}
      handleSubmit={async values => {
        await updateEnquete({
          variables: {
            id: enqueteIndividuelId,
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
