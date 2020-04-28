import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { EnqueteIndividuelInformationsAgrementFormationForm } from "./EnqueteIndividuelInformationsAgrementFormationForm";
import { ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENT_FORMATION } from "./queries";

export const EnqueteIndividuelInformationsAgrementFormation = props => {
  const { goToNextPage, goToPrevPage, enquete } = props;
  const { enqueteIndividuelId } = enquete;

  const { data, loading } = useQuery(ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENT_FORMATION, {
    variables: {
      id: enqueteIndividuelId
    }
  });

  if (loading) {
    return <Box p={4}>Chargement...</Box>;
  }

  const { enquete_individuels_by_pk: enqueteIndividuel = {} } = data;

  return (
    <EnqueteIndividuelInformationsAgrementFormationForm
      goToPrevPage={goToPrevPage}
      data={enqueteIndividuel}
      handleSubmit={async () => {
        await goToNextPage();
      }}
    />
  );
};

export default EnqueteIndividuelInformationsAgrementFormation;
