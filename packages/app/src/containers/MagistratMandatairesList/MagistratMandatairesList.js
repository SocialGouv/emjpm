import { useCallback, useState } from "react";
import { Box } from "rebass";

import { useDebounce } from "~/hooks";

import { MagistratMandatairesListStyle } from "./style";
import { MagistratMandatairesListList } from "./List";
import { MagistratMandatairesListFilters } from "./Filters";

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

function MagistratMandatairesList() {
  const [selectedType, setType] = useState(DEFAULT_VALUE);
  const [searchText, changeSearchText] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [orderBy, setOrderBy] = useState(orderByOptions[0].value);
  const debouncedSearchText = useDebounce(searchText, 10);

  const onChangeSearch = useCallback(
    (event) => {
      setCurrentOffset(0);
      changeSearchText(event.target.value);
    },
    [setCurrentOffset, changeSearchText]
  );
  const onChangeType = useCallback(
    (option) => {
      setCurrentOffset(0);
      setType(option);
    },
    [setCurrentOffset, setType]
  );

  return (
    <Box sx={MagistratMandatairesListStyle}>
      <MagistratMandatairesListFilters
        onChangeSearch={onChangeSearch}
        searchText={searchText}
        selectedType={selectedType}
        onChangeType={onChangeType}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <MagistratMandatairesListList
        orderBy={orderBy}
        debouncedSearchText={debouncedSearchText}
        setCurrentOffset={setCurrentOffset}
        currentOffset={currentOffset}
        selectedType={selectedType}
      />
    </Box>
  );
}

export { MagistratMandatairesList };
