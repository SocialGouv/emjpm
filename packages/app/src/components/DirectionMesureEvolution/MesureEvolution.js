import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box } from "rebass";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { MesureEvolutionChart } from "./MesureEvolutionChart";
import { GET_CATEGORY_EVOLUTION } from "./queries";

export const MesureEvolution = () => {
  const { filters } = useContext(FiltersContextSerializable);
  const { data, error, loading } = useQuery(GET_CATEGORY_EVOLUTION, {
    variables: {
      department: filters.departement ? parseInt(filters.departement.value) : undefined,
      end: filters.endDate,
      region: filters.region ? parseInt(filters.region.value) : undefined,
      start: filters.startDate,
    },
  });

  if (loading) {
    return (
      <Card flexBasis="100%">
        <Heading2>Évolution du nombre de mesures</Heading2>
        <Box my="4">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card flexBasis="100%">
        <Heading2>Évolution du nombre de mesures</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  return (
    <Card p="4" flexBasis="100%">
      <Heading2>Évolution du nombre de mesures</Heading2>
      <MesureEvolutionChart data={data} />
    </Card>
  );
};
