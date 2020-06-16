import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, MandataireListItem, Select, Spinner } from "@emjpm/ui";
import Router from "next/router";
import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { FiltersContext } from "../DirectionFilters/context";
import { GET_MANDATAIRES } from "./queries";
import { MandatairesListStyle } from "./style";
import { formatMandatairesList } from "./utils";

const optionsType = [
  { label: "Tous les types", value: null },
  { label: "Préposé", value: "MANDATAIRE_PRE" },
  { label: "Individuel", value: "MANDATAIRE_IND" },
  { label: "Service", value: "SERVICE" },
];

const optionsCapacity = [
  { label: "Aucun", value: null },
  { label: "Ascendant", value: "asc_nulls_last" },
  { label: "Descendant", value: "desc_nulls_last" },
];

const RESULT_PER_PAGE = 30;

const MandatairesList = (props) => {
  const { selectedDepartementValue, selectedRegionalValue } = useContext(FiltersContext);
  const [selectedType, setType] = useState(false);
  const [selectedCapacity, setCapacity] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const { data, error, loading } = useQuery(GET_MANDATAIRES, {
    variables: {
      departement: selectedDepartementValue ? selectedDepartementValue.value : null,
      discriminator: selectedType ? selectedType.value : null,
      offset: currentOffset,
      limit: RESULT_PER_PAGE,
      order: selectedCapacity ? selectedCapacity.value : null,
      region: selectedRegionalValue ? selectedRegionalValue.value : null,
    },
  });

  if (loading) {
    return (
      <Card>
        <Heading2>Liste des mandataires</Heading2>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Heading2>Liste des mandataires</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const { count } = data.count.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const list = formatMandatairesList(data.mandatairesList);
  return (
    <Box sx={MandatairesListStyle} {...props}>
      <Flex mb="3">
        <Box width="200px" mr="2">
          <Select
            size="small"
            placeholder="Type de mandataire"
            onChange={(option) => setType(option)}
            value={selectedType}
            options={optionsType}
          />
        </Box>
        <Box width="200px">
          <Select
            size="small"
            placeholder="trier par capacité"
            onChange={(capacity) => setCapacity(capacity)}
            value={selectedCapacity}
            options={optionsCapacity}
          />
        </Box>
      </Flex>
      {list.map((gestionnaire) => {
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
            onPageChange={(data) => {
              setCurrentOffset(data.selected * RESULT_PER_PAGE);
            }}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Flex>
      )}
    </Box>
  );
};

export { MandatairesList };
