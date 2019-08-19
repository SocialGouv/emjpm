import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box } from "rebass";
import { Card, Heading2 } from "@socialgouv/emjpm-ui-core";
import MapComponent from "./Map";
import { GET_DEPARTEMENTS_AVAILABILITY } from "../../graphql/Queries";

export const Map = () => {
  const { data, loading } = useQuery(GET_DEPARTEMENTS_AVAILABILITY);

  if (loading) {
    return <div>loading...</div>;
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
    <Card p="4" flexBasis="49.5%">
      <Box>
        <Heading2>Cartes de la disponibilité des mesures</Heading2>
      </Box>
      <Box sx={{ position: "relative", p: "6" }}>
        <MapComponent departements={departements} />
      </Box>
    </Card>
  );
};
