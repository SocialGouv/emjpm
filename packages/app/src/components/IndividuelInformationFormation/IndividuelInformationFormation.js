import { useQuery } from "@apollo/react-hooks";
import React, { Fragment, useContext } from "react";
import { Box, Text } from "rebass";

import { UserContext } from "../UserContext";
import { IndividuelInformationFormationForm } from "./IndividuelInformationFormationForm";
import { INDIVIDUEL_FORMATION } from "./queries";

const IndividuelInformationFormation = () => {
  const { mandataire } = useContext(UserContext);

  const handleSubmit = values => {
    console.log(values);
  };

  const { data, error, loading } = useQuery(INDIVIDUEL_FORMATION, {
    mandataire_id: mandataire.id
  });

  if (error) {
    return null;
  }

  if (loading || !data || !data.individuel_formations) {
    return null;
  }

  const [formation] = data.individuel_formations;

  return (
    <Box>
      {formation ? (
        <IndividuelInformationFormationForm formation={formation} handleSubmit={handleSubmit} />
      ) : (
        <Fragment>
          <Text>${`Formation et niveau de qualification`}</Text>
          <Text color="textSecondary">.</Text>
        </Fragment>
      )}
    </Box>
  );
};

export { IndividuelInformationFormation };
