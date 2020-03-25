import { useQuery } from "@apollo/react-hooks";
import React, { Fragment, useContext } from "react";
import { Box, Text } from "rebass";

import { UserContext } from "../UserContext";
import { IndividuelInformationAgrementForm } from "./IndividuelInformationAgrementForm";
import { MANDATAIRE_AGREMENT } from "./queries";

const IndividuelInformationAgrement = () => {
  const { mandataire } = useContext(UserContext);

  const handleSubmit = values => {
    console.log(values);
  };

  const { data, error, loading } = useQuery(MANDATAIRE_AGREMENT, {
    mandataire_id: mandataire.id
  });

  if (error) {
    return null;
  }

  if (loading || !data || !data.mandataire_agrements) {
    return null;
  }

  const [agrement] = data.mandataire_agrements;

  return (
    <Box>
      {agrement ? (
        <IndividuelInformationAgrementForm agrement={agrement} handleSubmit={handleSubmit} />
      ) : (
        <Fragment>
          <Text>Agrément non disponible.</Text>
          <Text color="textSecondary">.</Text>
        </Fragment>
      )}
    </Box>
  );
};

export { IndividuelInformationAgrement };
