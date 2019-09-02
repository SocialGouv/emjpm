import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import { Box } from "rebass";

import { MandatairesCapacityChart } from "./MandatairesCapacityChart";
import { FiltersContext } from "../Filters/context";
import { MANDATAIRES_CAPACITY } from "./queries";

const MandatairesCapacity = props => {
  const {
    selectedRegionalValue,
    startDateValue,
    selectedDepartementValue,
    endDateValue
  } = useContext(FiltersContext);

  const { data, error, loading } = useQuery(MANDATAIRES_CAPACITY, {
    variables: {
      start: startDateValue,
      end: endDateValue,
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined
    }
  });

  if (loading) {
    return (
      <Card p="4">
        <Heading2>Capacité des mandataires</Heading2>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card p="4">
        <Heading2>Capacité des mandataires</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  return (
    <Card p="4" {...props}>
      <Heading2>Capacité des mandataires</Heading2>
      <MandatairesCapacityChart data={data} />
    </Card>
  );
};

export { MandatairesCapacity };
