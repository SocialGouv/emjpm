import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box } from "rebass";
import { Card, Heading2, Spinner } from "@socialgouv/emjpm-ui-core";
import MapComponent from "./Map";
import { GET_DEPARTEMENTS_AVAILABILITY } from "./queries";

const AvailabilityMap = () => {
  const { data, loading } = useQuery(GET_DEPARTEMENTS_AVAILABILITY);

  if (loading) {
    return (
      <Card p="4" minHeight="450px">
        <Box>
          <Heading2>Disponibilités par territoire</Heading2>
        </Box>
        <Box sx={{ position: "relative", p: "6" }}>
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card p="4">
        <Box>
          <Heading2>Disponibilités par territoire</Heading2>
        </Box>
        <Box sx={{ position: "relative", p: "6" }}>error</Box>
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
      <Box sx={{ position: "relative", p: "2", mt: "2", height: "460px" }}>
        <MapComponent departements={departements} />
      </Box>
    </Card>
  );
};

export { AvailabilityMap };
