import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnqueteIndividuelPrestationsSocialesForm } from "./EnqueteIndividuelPrestationsSocialesForm";
import { ENQUETE_INDIVIDUEL_PRESTATION_SOCIALES } from "./queries";

export const EnqueteIndividuelPrestationsSociales = props => {
  const { goToNextPage, goToPrevPage, enquete } = props;
  const { enqueteIndividuelId } = enquete;
  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_PRESTATION_SOCIALES, {
    variables: {
      id: enqueteIndividuelId
    }
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
        // TODO(remiroyc)
        await goToNextPage();
      }}
    />
  );
};

export default EnqueteIndividuelPrestationsSociales;
