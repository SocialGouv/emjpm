import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";

import { UserContext } from "~/components/UserContext";
import { useDebounce } from "~/lib/hooks";
import {
  Card,
  Heading4,
  Input,
  MandataireContextProvider,
  MandataireListItem,
  Select,
  Spinner,
  Text,
} from "~/ui";

import { GET_MANDATAIRES } from "./queries";
import { MagistratMandatairesListStyle, TextStyle } from "./style";
import { formatMandatairesList } from "./utils";

const DEFAULT_VALUE = { label: "Tous les types", value: null };

const optionsType = [
  DEFAULT_VALUE,
  { label: "Préposé", value: "MANDATAIRE_PRE" },
  { label: "Individuel", value: "MANDATAIRE_IND" },
  { label: "Service", value: "SERVICE" },
];

const orderByOptions = [
  {
    label: "disponibilité",
    value: 0,
  },
  {
    label: "ordre alphabétique (A-Z)",
    value: 1,
  },
  {
    label: "ordre alphabétique (Z-A)",
    value: 2,
  },
];

const RESULT_PER_PAGE = 20;

function getOrderByVariable(orderBy) {
  switch (orderBy) {
    case 0:
      return { gestionnaire: { remaining_capacity: "desc_nulls_last" } };
    case 1:
      return {
        name: "asc",
      };
    case 2:
      return {
        name: "desc",
      };
  }
}

const MagistratMandatairesList = (props) => {
  const history = useHistory();
  const {
    magistrat: { ti_id },
  } = useContext(UserContext);
  const [selectedType, setType] = useState(DEFAULT_VALUE);
  const [searchText, changeSearchText] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [orderBy, setOrderBy] = useState(orderByOptions[0].value);
  const debouncedSearchText = useDebounce(searchText, 2000);

  const { data, error, loading } = useQuery(GET_MANDATAIRES, {
    variables: {
      discriminator: selectedType ? selectedType.value : null,
      limit: RESULT_PER_PAGE,
      offset: currentOffset,
      orderBy: getOrderByVariable(orderBy),
      searchText: debouncedSearchText ? `%${debouncedSearchText}%` : null,
      tribunal: ti_id,
    },
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
  const totalPage = count / RESULT_PER_PAGE;
  const gestionnaires = formatMandatairesList(data.mandatairesList);
  return (
    <MandataireContextProvider>
      <Box sx={MagistratMandatairesListStyle} {...props}>
        <Card mb="2" mt="1">
          <Flex justifyContent="space-between" alignItems="center">
            <Flex flexWrap="wrap">
              <Text sx={TextStyle}>AFFINER LES RÉSULTATS</Text>
              <Box width="200px" mr="2">
                <Select
                  instanceId={"type-mandataire-filter"}
                  size="small"
                  placeholder="Type de mandataire"
                  onChange={(option) => {
                    setCurrentOffset(0);
                    setType(option);
                  }}
                  value={selectedType}
                  options={optionsType}
                />
              </Box>
              <Box width="200px" mr={1}>
                <Input
                  value={searchText}
                  spellCheck="false"
                  autoComplete="false"
                  onChange={(event) => {
                    setCurrentOffset(0);
                    changeSearchText(event.target.value);
                  }}
                  name="search"
                  size="small"
                  placeholder="mandataire / service"
                />
              </Box>
            </Flex>

            <Flex alignItems="center">
              <Text mr={2}>Trier par:</Text>
              <Box width="200px">
                <Select
                  instanceId={"mandataire-sort"}
                  size="small"
                  onChange={({ value }) => setOrderBy(value)}
                  value={orderByOptions.find(({ value }) => value === orderBy)}
                  options={orderByOptions}
                />
              </Box>
            </Flex>
          </Flex>
        </Card>
        {gestionnaires.map((gestionnaire) => {
          return (
            <MandataireListItem
              key={gestionnaire.id}
              onClick={() =>
                history.push(`/magistrats/gestionnaires/${gestionnaire.id}`)
              }
              gestionnaire={gestionnaire}
            />
          );
        })}
        {count > RESULT_PER_PAGE && (
          <Flex alignItems="center" justifyContent="center">
            <ReactPaginate
              previousLabel={"Précédent"}
              nextLabel={"Suivant"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={totalPage}
              containerClassName={"react-paginate"}
              marginPagesDisplayed={2}
              forcePage={currentOffset / RESULT_PER_PAGE}
              pageRangeDisplayed={5}
              onPageChange={(data) => {
                setCurrentOffset(data.selected * RESULT_PER_PAGE);
              }}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </Flex>
        )}
      </Box>
    </MandataireContextProvider>
  );
};

export { MagistratMandatairesList };
