import { useQuery } from "@apollo/react-hooks";
import React, { Fragment, useContext } from "react";
import { Box, Text } from "rebass";

import { UserContext } from "../UserContext";
import { IndividuelInformationExerciceForm } from "./IndividuelInformationExerciceForm";
import { INDIVIDUEL_EXERCICE } from "./queries";

const IndividuelInformationExercice = () => {
  const { mandataire } = useContext(UserContext);

  const handleSubmit = values => {
    console.log(values);
  };

  const { data, error, loading } = useQuery(INDIVIDUEL_EXERCICE, {
    mandataire_id: mandataire.id
  });

  if (error) {
    return null;
  }

  if (loading || !data || !data.mandataire_exercices) {
    return null;
  }

  const [exercice] = data.mandataire_exercices;

  return (
    <Box>
      {exercice ? (
        <IndividuelInformationExerciceForm exercice={exercice} handleSubmit={handleSubmit} />
      ) : (
        <Fragment>
          <Text>${`Modalité d'exercice non disponible`}</Text>
          <Text color="textSecondary">.</Text>
        </Fragment>
      )}
    </Box>
  );
};

export { IndividuelInformationExercice };
