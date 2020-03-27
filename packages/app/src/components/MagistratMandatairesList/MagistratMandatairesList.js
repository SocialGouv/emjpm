import { useQuery } from "@apollo/react-hooks";
import {
  Card,
  Heading4,
  Input,
  MandataireContextProvider,
  MandataireListItem,
  Select,
  Spinner,
  Text
} from "@emjpm/ui";
import Router from "next/router";
import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { useDebounce } from "../../lib/hooks";
import { UserContext } from "../UserContext";
import { GET_MANDATAIRES } from "./queries";
import { MagistratMandatairesListStyle, TextStyle } from "./style";
import { formatMandatairesList } from "./utils";

const DEFAULT_VALUE = { label: "Tous les types", value: null };

const optionsType = [
  DEFAULT_VALUE,
  { label: "Préposé", value: "MANDATAIRE_PRE" },
  { label: "Individuel", value: "MANDATAIRE_IND" },
  { label: "Service", value: "SERVICE" }
];

const RESULT_PER_PAGE = 20;

const MagistratMandatairesList = props => {
  const {
    magistrat: { ti_id }
  } = useContext(UserContext);
  const [selectedType, setType] = useState(DEFAULT_VALUE);
  const [searchText, changeSearchText] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const debouncedSearchText = useDebounce(searchText, 2000);

  const { data, error, loading } = useQuery(GET_MANDATAIRES, {
    variables: {
      discriminator: selectedType ? selectedType.value : null,
      limit: RESULT_PER_PAGE,
      offset: currentOffset,
      order: "desc_nulls_last",
      tribunal: ti_id,
      searchText: debouncedSearchText ? `%${debouncedSearchText}%` : null
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
  const totalPage = count / RESULT_PER_PAGE;
  const gestionnaires = formatMandatairesList(data.mandatairesList);
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
            <Box width="200px" mr={1}>
              <Input
                value={searchText}
                spellCheck="false"
                autoComplete="false"
                onChange={event => changeSearchText(event.target.value)}
                name="search"
                size="small"
                placeholder="mandataire / service"
              />
            </Box>
          </Flex>
        </Card>
        {gestionnaires.map(gestionnaire => {
          return (
            <MandataireListItem
              key={gestionnaire.id}
              onClick={() =>
                Router.push(
                  "/magistrats/gestionnaires/[gestionnaire_id]",
                  `/magistrats/gestionnaires/${gestionnaire.id}`,
                  { shallow: true }
                )
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
              onPageChange={data => {
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
