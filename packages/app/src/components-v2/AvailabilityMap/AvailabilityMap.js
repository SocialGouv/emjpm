import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Spinner } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import MapComponent from "./Map";
import { GET_DEPARTEMENTS_AVAILABILITY } from "./queries";

const AvailabilityMap = () => {
  const { data, loading, error } = useQuery(GET_DEPARTEMENTS_AVAILABILITY);

  if (loading) {
    return (
      <Card p="4" minHeight="450px">
        <Box>
          <Heading2>Disponibilités par territoire</Heading2>
        </Box>
        <Box sx={{ p: "6", position: "relative" }}>
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card p="4">
        <Box>
          <Heading2>Disponibilités par territoire</Heading2>
        </Box>
        <Box sx={{ p: "6", position: "relative" }}>error</Box>
      </Card>
    );
  }

  const departements = data.view_department_availability
    .filter(departement => departement.mesures_in_progress > 0)
    .map(departement => {
      if (departement.mesures_in_progress > 0) {
        return {
          ...departement,
          isAbove: departement.mesures_in_progress > departement.mesures_max
        };
      }
      return null;
    });

  return (
    <Card p="4">
      <Box>
        <Heading2>Disponibilités par territoire</Heading2>
      </Box>
      <Box sx={{ height: ["auto", "auto", "434px"], mt: "2", p: "2", position: "relative" }}>
        <MapComponent departements={departements} />
      </Box>
    </Card>
  );
};

export { AvailabilityMap };
