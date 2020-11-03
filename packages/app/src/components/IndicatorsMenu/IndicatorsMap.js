import { useQuery } from "@apollo/react-hooks";
import { Card, Heading1, Spinner } from "@emjpm/ui";
import React from "react";
import France from "@socialgouv/react-departements";
import { Box, Flex } from "rebass";

import { INDICATORS } from "./queries";

export const IndicatorsMap = () => {
  const { data, error, loading } = useQuery(INDICATORS);

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const departements = data.departements.map(({ code }) => code);
  return (
    <Card>
      <Heading1 py="5">Département déployé</Heading1>
      <Flex justifyContent="center">
        <France departements={departements} />
      </Flex>
    </Card>
  );
};
