import { useQuery } from "@apollo/react-hooks";
import { Mandatairelist } from "@socialgouv/emjpm-ui-components";
import { Button, Card, Heading4, Select, Spinner } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";
import { Box, Flex } from "rebass";
import { CURRENT_USER, GET_MANDATAIRES } from "./queries";
import { MagistratMandatairesListStyle } from "./style";
import { formatMandatairesList } from "./utils";

const optionsType = [
  { label: "Tous les types", value: null },
  { label: "Préposé", value: "MANDATAIRE_PRE" },
  { label: "Individuel", value: "MANDATAIRE_IND" },
  { label: "Service", value: "SERVICE" }
];

const optionsCapacity = [
  { label: "Aucun", value: null },
  { label: "Ascendant", value: "asc" },
  { label: "Descendant", value: "desc" }
];

const RESULT_PER_PAGE = 10;

const MagistratMandatairesList = props => {
  const [selectedType, setType] = useState(false);
  const [selectedCapacity, setCapacity] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const userQuery = useQuery(CURRENT_USER);

  const { data, error, loading, fetchMore } = useQuery(GET_MANDATAIRES, {
    variables: {
      offset: 0,
      tribunal: userQuery.data.currentUser.magistrat.ti_id,
      order: selectedCapacity ? selectedCapacity.value : null,
      discriminator: selectedType ? selectedType.value : null
    }
  });

  if (userQuery.loading || loading) {
    return (
      <Card>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (userQuery.error || error) {
    return (
      <Card>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const { count } = data.count.aggregate;
  const list = formatMandatairesList(data.mandatairesList);
  return (
    <Box sx={MagistratMandatairesListStyle} {...props}>
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
                variables: {
                  offset: currentPage + RESULT_PER_PAGE
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  setCurrentPage(currentPage + RESULT_PER_PAGE);
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
      )}
    </Box>
  );
};

export { MagistratMandatairesList };
