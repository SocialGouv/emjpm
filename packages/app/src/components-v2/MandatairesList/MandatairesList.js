import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { Button, Card, Heading2, Heading4, Spinner, Select } from "@socialgouv/emjpm-ui-core";
import { Box, Flex } from "rebass";
import { Mandatairelist } from "@socialgouv/emjpm-ui-components";

import { FiltersContext } from "../Filters/context";
import { formatMandatairesList } from "./utils";
import { GET_MANDATAIRES } from "./queries";
import { MandatairesListStyle } from "./style";

const optionsType = [
  { label: "Tous les types", value: null },
  { label: "Préposé", value: "MANDATAIRE_PRE" },
  { label: "Individuel", value: "MANDATAIRE_IND" },
  { label: "Service", value: "SERVICE" }
];

const optionsCapacity = [
  { label: "Ascendant", value: "MANDATAIRE_IND" },
  { label: "Descendant", value: "SERVICE" }
];

const MandatairesList = props => {
  const { selectedDepartementValue, selectedRegionalValue } = useContext(FiltersContext);
  const [selectedType, setType] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { data, error, loading, fetchMore } = useQuery(GET_MANDATAIRES, {
    variables: {
      offset: 0,
      discriminator: selectedType ? selectedType.value : null,
      departement: selectedDepartementValue ? selectedDepartementValue.value : null,
      region: selectedRegionalValue ? selectedRegionalValue.value : null
    }
  });

  if (loading) {
    return (
      <Card>
        <Heading2>Répartition des mesures à date</Heading2>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Heading2>Répartition des mesures à date</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }
  console.log(data.mandatairesList);
  const list = formatMandatairesList(data.mandatairesList);
  return (
    <Box sx={MandatairesListStyle} {...props}>
      <Flex mb="3">
        <Box width="200px" mr="2">
          <Select
            size="small"
            placeholder="Type de mandataire"
            onChange={selectedOption => setType(selectedOption)}
            value={selectedType}
            options={optionsType}
          />
        </Box>
        <Box width="200px">
          <Select
            size="small"
            placeholder="trier par capacité"
            onChange={selectedOption => setType(selectedOption)}
            value={selectedType}
            options={optionsCapacity}
          />
        </Box>
      </Flex>
      <Mandatairelist mandataires={list} />
      <Flex mt="5" alignItem="center">
        <Button
          onClick={() => {
            fetchMore({
              variables: {
                offset: currentPage + 10
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                setCurrentPage(currentPage + 10);
                return {
                  count: fetchMoreResult.count,
                  mandatairesList: [...prev.mandatairesList, ...fetchMoreResult.mandatairesList]
                };
              }
            });
          }}
        >
          Afficher les mandataires suivants
        </Button>
      </Flex>
    </Box>
  );
};

export { MandatairesList };
