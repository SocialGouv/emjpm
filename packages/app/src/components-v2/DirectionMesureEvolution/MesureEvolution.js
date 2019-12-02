import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box } from "rebass";

import { FiltersContext } from "../DirectionFilters/context";
import { MesureEvolutionChart } from "./MesureEvolutionChart";
import { GET_CATEGORY_EVOLUTION } from "./queries";

export const MesureEvolution = () => {
  const {
    startDateValue,
    endDateValue,
    selectedRegionalValue,
    selectedDepartementValue
  } = useContext(FiltersContext);

  const { data, error, loading } = useQuery(GET_CATEGORY_EVOLUTION, {
    variables: {
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      end: endDateValue,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined,
      start: startDateValue
    }
  });

  if (loading) {
    return (
      <Card flexBasis="100%">
        <Heading2>Répartition des mesures à date</Heading2>
        <Box my="4">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card flexBasis="100%">
        <Heading2>Répartition des mesures à date</Heading2>
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
