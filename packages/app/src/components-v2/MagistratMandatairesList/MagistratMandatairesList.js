import { useQuery } from "@apollo/react-hooks";
import { MandataireContextProvider, Mandatairelist } from "@socialgouv/emjpm-ui-components";
import { Button, Card, Heading4, Select, Spinner, Text } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";
import { Box, Flex } from "rebass";

import { MagistratChoose } from "./MagistratChoose";
import { GET_MANDATAIRES } from "./queries";
import { MagistratMandatairesListStyle, TextStyle } from "./style";
import { formatMandatairesList } from "./utils";
const optionsType = [
  { label: "Tous les types", value: null },
  { label: "Préposé", value: "MANDATAIRE_PRE" },
  { label: "Individuel", value: "MANDATAIRE_IND" },
  { label: "Service", value: "SERVICE" }
];

const optionsCapacity = [
  { label: "Du moins disponible au plus disponible", value: "asc_nulls_last" },
  { label: "Du plus disponible au moins disponible", value: "desc_nulls_last" }
];

const RESULT_PER_PAGE = 20;

const MagistratMandatairesList = props => {
  const {
    cabinet,
    magistrat: { ti_id }
  } = props;
  const [selectedType, setType] = useState(false);
  const [selectedCapacity, setCapacity] = useState({
    label: "Du plus disponible au moins disponible",
    value: "desc_nulls_last"
  });
  const [currentPage, setCurrentPage] = useState(0);

  const { data, error, loading, fetchMore } = useQuery(GET_MANDATAIRES, {
    variables: {
      discriminator: selectedType ? selectedType.value : null,
      limit: RESULT_PER_PAGE,
      offset: 0,
      order: selectedCapacity ? selectedCapacity.value : null,
      tribunal: ti_id
    }
  });

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const { count } = data.count.aggregate;
  const list = formatMandatairesList(data.mandatairesList);
  return (
    <MandataireContextProvider>
      <Box sx={MagistratMandatairesListStyle} {...props}>
        <Card mb="2" mt="1">
          <Flex flexWrap="wrap">
            <Text sx={TextStyle}>AFFINER LES RÉSULTATS</Text>
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
                placeholder="Trier par capacité"
                onChange={capacity => setCapacity(capacity)}
                value={selectedCapacity}
                options={optionsCapacity}
              />
            </Box>
          </Flex>
        </Card>
        <Mandatairelist
          isMagistrat
          ChooseComponent={props => <MagistratChoose tiId={ti_id} cabinet={cabinet} {...props} />}
          mandataires={list}
        />
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
                    limit: RESULT_PER_PAGE,
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
    </MandataireContextProvider>
  );
};

export { MagistratMandatairesList };
