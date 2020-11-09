import { useQuery } from "@apollo/react-hooks";
import { Card, CheckBox, Heading2, Heading4, Select, Spinner } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box } from "rebass";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { MandatairesCapacityChart } from "./MandatairesCapacityChart";
import { MANDATAIRES_CAPACITY } from "./queries";

const options = [
  { label: "Chocolate", value: "chocolate" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Vanilla", value: "vanilla" },
];

const MandatairesCapacity = (props) => {
  const { filters } = useContext(FiltersContextSerializable);
  const { data, error, loading } = useQuery(MANDATAIRES_CAPACITY, {
    variables: {
      department: filters.departement
        ? parseInt(filters.departement)
        : undefined,
      end: filters.endDate,
      region: filters.region ? parseInt(filters.region) : undefined,
      start: filters.startDate,
    },
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
          onChange={(selectedOption) => console.log(selectedOption)}
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
