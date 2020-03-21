import { useQuery } from "@apollo/react-hooks";
import React, { Fragment, useContext } from "react";
import { Box, Text } from "rebass";

import { UserContext } from "../UserContext";
import { MandataireAgrementForm } from "./MandataireAgrementForm";
import { MANDATAIRE_AGREMENT } from "./queries";

const MandataireAgrement = () => {
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
        <MandataireAgrementForm agrement={agrement} handleSubmit={handleSubmit} />
      ) : (
        <Fragment>
          <Text>Agrément non disponible.</Text>
          <Text color="textSecondary">.</Text>
        </Fragment>
      )}
    </Box>
  );
};

export { MandataireAgrement };
