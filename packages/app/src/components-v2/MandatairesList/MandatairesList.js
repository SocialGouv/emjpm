import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { Button, Card, Heading2, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import { Box, Flex } from "rebass";
import { Mandatairelist } from "@socialgouv/emjpm-ui-components";

import { formatMandatairesList } from "./utils";
import { GET_MANDATAIRES } from "./queries";
import { MandatairesListStyle } from "./style";

const MandatairesList = props => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, error, loading, fetchMore } = useQuery(GET_MANDATAIRES, {
    variables: {
      offset: 0
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

  const list = formatMandatairesList(data.mandatairesList);
  return (
    <Box sx={MandatairesListStyle} {...props}>
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
