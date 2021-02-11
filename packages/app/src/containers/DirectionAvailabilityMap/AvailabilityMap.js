import { useQuery } from "@apollo/client";

import { Box } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { Card, Heading } from "~/components";

import MapComponent from "./Map";
import { GET_DEPARTEMENTS_AVAILABILITY } from "./queries";

function AvailabilityMap() {
  const { data, loading, error } = useQuery(GET_DEPARTEMENTS_AVAILABILITY);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const departements = data.view_department_availability
    .filter((departement) => departement.mesures_in_progress > 0)
    .map((departement) => {
      if (departement.mesures_in_progress > 0) {
        return {
          ...departement,
          isAbove: departement.mesures_in_progress > departement.mesures_max,
        };
      }
      return null;
    });

  return (
    <Card p="4">
      <Box>
        <Heading size={2}>Disponibilités par territoire</Heading>
      </Box>
      <Box
        sx={{
          height: ["auto", "auto", "434px"],
          mt: "2",
          p: "2",
          position: "relative",
        }}
      >
        <MapComponent departements={departements} />
      </Box>
    </Card>
  );
}

export { AvailabilityMap };
