import { useQuery } from "@apollo/react-hooks";
import { Card, CheckBox, Heading2, Heading4, Select, Spinner } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box } from "rebass";

import { FiltersContext } from "../DirectionFilters/context";
import { MandatairesCapacityChart } from "./MandatairesCapacityChart";
import { MANDATAIRES_CAPACITY } from "./queries";

const options = [
  { label: "Chocolate", value: "chocolate" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Vanilla", value: "vanilla" }
];

const MandatairesCapacity = props => {
  const {
    selectedRegionalValue,
    startDateValue,
    selectedDepartementValue,
    endDateValue
  } = useContext(FiltersContext);

  const { data, error, loading } = useQuery(MANDATAIRES_CAPACITY, {
    variables: {
      department: selectedDepartementValue ? parseInt(selectedDepartementValue.value) : undefined,
      end: endDateValue,
      region: selectedRegionalValue ? parseInt(selectedRegionalValue.value) : undefined,
      start: startDateValue
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
      <Box mt="3">
        <Select
          placeholder="Mandataire en surcapacité par ordre décroissant"
          options={options}
          value={"selectedValue"}
          onChange={selectedOption => console.log(selectedOption)}
        />
      </Box>
      <MandatairesCapacityChart data={data} />
      <Box mt="2">
        <CheckBox label="Masquer les mandataires en surcapacité" name="test" />
      </Box>
    </Card>
  );
};

export { MandatairesCapacity };
