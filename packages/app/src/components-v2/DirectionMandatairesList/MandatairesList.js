import { useQuery } from "@apollo/react-hooks";
import { Mandatairelist } from "@socialgouv/emjpm-ui-components";
import { Button, Card, Heading2, Heading4, Select, Spinner } from "@socialgouv/emjpm-ui-core";
import React, { useContext, useState } from "react";
import { Box, Flex } from "rebass";

import { FiltersContext } from "../DirectionFilters/context";
import { GET_MANDATAIRES } from "./queries";
import { MandatairesListStyle } from "./style";
import { formatMandatairesList } from "./utils";

const optionsType = [
  { label: "Tous les types", value: null },
  { label: "Préposé", value: "MANDATAIRE_PRE" },
  { label: "Individuel", value: "MANDATAIRE_IND" },
  { label: "Service", value: "SERVICE" }
];

const optionsCapacity = [
  { label: "Aucun", value: null },
  { label: "Ascendant", value: "asc_nulls_last" },
  { label: "Descendant", value: "desc_nulls_last" }
];

const RESULT_PER_PAGE = 10;

const MandatairesList = props => {
  const { selectedDepartementValue, selectedRegionalValue } = useContext(FiltersContext);
  const [selectedType, setType] = useState(false);
  const [selectedCapacity, setCapacity] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { data, error, loading, fetchMore } = useQuery(GET_MANDATAIRES, {
    variables: {
      departement: selectedDepartementValue ? selectedDepartementValue.value : null,
      discriminator: selectedType ? selectedType.value : null,
      offset: 0,
      order: selectedCapacity ? selectedCapacity.value : null,
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

  const { count } = data.count.aggregate;
  const list = formatMandatairesList(data.mandatairesList);
  return (
    <Box sx={MandatairesListStyle} {...props}>
      <Flex mb="3">
        <Box width="200px" mr="2">
          <Select
            size="small"
            placeholder="Type de mandataire"
            onChange={option => setType(option)}
            value={selectedType}
            options={optionsType}
          />
        </Box>
        <Box width="200px">
          <Select
            size="small"
            placeholder="trier par capacité"
            onChange={capacity => setCapacity(capacity)}
            value={selectedCapacity}
            options={optionsCapacity}
          />
        </Box>
      </Flex>
      <Mandatairelist mandataires={list} />
      {count > RESULT_PER_PAGE && count > currentPage - RESULT_PER_PAGE && (
        <Flex mt="5" alignItem="center">
          <Button
            onClick={() => {
              fetchMore({
                updateQuery: (prev, { fetchMoreResult }) => {
                  setCurrentPage(currentPage + RESULT_PER_PAGE);
                  return {
                    count: fetchMoreResult.count,
                    mandatairesList: [...prev.mandatairesList, ...fetchMoreResult.mandatairesList]
                  };
                },
                variables: {
                  offset: currentPage + RESULT_PER_PAGE
                }
              });
            }}
          >
            Afficher les mandataires suivants
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export { MandatairesList };
