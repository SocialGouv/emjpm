import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { AccessibleSelect } from "~/components";
import MandataireListItem from "~/containers/MandataireListItem";

import {
  GET_MANDATAIRES_BY_DEPARTEMENT,
  GET_MANDATAIRES_BY_REGION,
  GET_MANDATAIRES_BY_NATION,
} from "./queries";
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

function MandatairesList(props) {
  const { filters } = useContext(FiltersContextSerializable);
  const [selectedType, setType] = useState(false);
  const [selectedCapacity, setCapacity] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    setCurrentOffset(0);
  }, [filters]);

  const variables = {
    discriminator: selectedType ? selectedType.value : null,
    limit: RESULT_PER_PAGE,
    offset: currentOffset,
    order: selectedCapacity ? selectedCapacity.value : null,
  };

  if (filters.region && !filters.departement) {
    variables.region = parseInt(filters.region);
  } else if (filters.departement) {
    variables.departement = filters.departement ? filters.departement : null;
  }

  if (filters.nom) {
    variables.nom = `%${filters.nom}%`;
  }

  const getMandatairesQuery =
    filters.region && !filters.departement
      ? GET_MANDATAIRES_BY_REGION
      : filters.departement
      ? GET_MANDATAIRES_BY_DEPARTEMENT
      : GET_MANDATAIRES_BY_NATION;

  const { data, error, loading } = useQuery(getMandatairesQuery, {
    variables,
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { count } = data.count.aggregate;
  const totalPage = count / RESULT_PER_PAGE;
  const list = formatMandatairesList(data.mandatairesList);
  return (
    <Box sx={MandatairesListStyle} {...props}>
      <Flex mb="3">
        <Box width="200px" mr="2">
          <AccessibleSelect
            instanceId={"type-mandataire-filter"}
            size="small"
            placeholder="Type de mandataire"
            onChange={(option) => setType(option)}
            value={selectedType}
            options={optionsType}
          />
        </Box>
        <Box width="200px">
          <AccessibleSelect
            instanceId={"capacity-sort"}
            size="small"
            placeholder="trier par capacité"
            onChange={(capacity) => setCapacity(capacity)}
            value={selectedCapacity}
            options={optionsCapacity}
          />
        </Box>
      </Flex>
      <ul>
        {list.map((gestionnaire) => {
          return (
            <MandataireListItem
              key={gestionnaire.id}
              gestionnaire={gestionnaire}
              departementFilter={filters.departement}
              tag="li"
            />
          );
        })}
      </ul>
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
}

export { MandatairesList };
