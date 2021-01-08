import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Box, Flex } from "rebass";

import { FiltersContextSerializable } from "~/components/FiltersContextSerializable";
import {
  Card,
  Heading2,
  Heading4,
  MandataireListItem,
  Select,
  Spinner,
} from "~/ui";

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
  const { filters } = useContext(FiltersContextSerializable);
  const [selectedType, setType] = useState(false);
  const [selectedCapacity, setCapacity] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    setCurrentOffset(0);
  }, [filters]);

  const variables = {
    departement: filters.departement ? parseInt(filters.departement) : null,
    discriminator: selectedType ? selectedType.value : null,
    limit: RESULT_PER_PAGE,
    offset: currentOffset,
    order: selectedCapacity ? selectedCapacity.value : null,
    region: filters.region ? parseInt(filters.region) : null,
  };

  if (filters.nom) {
    variables.nom = `${filters.nom}%`;
  }

  const { data, error, loading } = useQuery(GET_MANDATAIRES, {
    variables,
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
            instanceId={"type-mandataire-filter"}
            size="small"
            placeholder="Type de mandataire"
            onChange={(option) => setType(option)}
            value={selectedType}
            options={optionsType}
          />
        </Box>
        <Box width="200px">
          <Select
            instanceId={"capacity-sort"}
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
            onClick={() => {}}
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
