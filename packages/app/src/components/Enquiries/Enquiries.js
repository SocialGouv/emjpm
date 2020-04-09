import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box, Text } from "rebass";

import { ENQUIRIES } from "./queries";

export const Enquiries = () => {
  const { data, loading } = useQuery(ENQUIRIES);

  if (loading) {
    return <Box p={2}>Chargement...</Box>;
  }

  const { enquiries } = data;

  return (
    <Box>
      {enquiries.map(enquiry => {
        return <Text key={enquiry.id}>{enquiry.year}</Text>;
      })}
    </Box>
  );
};

export default Enquiries;
