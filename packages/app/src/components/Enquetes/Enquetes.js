import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box, Text } from "rebass";

import { ENQUETES } from "./queries";

export const Enquetes = () => {
  const { data, loading } = useQuery(ENQUETES);

  if (loading) {
    return <Box p={2}>Chargement...</Box>;
  }

  const { enquetes } = data;

  return (
    <Box>
      {enquetes.map(enquete => {
        return <Text key={enquete.id}>{enquete.year}</Text>;
      })}
    </Box>
  );
};

export default Enquetes;
