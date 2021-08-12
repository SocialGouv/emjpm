import { useCallback, useState } from "react";
import { Box } from "rebass";

import { useDebounce } from "~/hooks";

import { MagistratMandatairesListStyle } from "./style";
import { MagistratMandatairesListList } from "./List";
import { MagistratMandatairesListFilters } from "./Filters";

const DEFAULT_VALUE = { label: "Tous les types", value: null };

function MagistratMandatairesList() {
  const [selectedType, setType] = useState(DEFAULT_VALUE);
  const [searchText, setSearchText] = useState(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [orderBy, setOrderBy] = useState(0);
  const debouncedSearchText = useDebounce(searchText, 10);
  const [prefer, setPrefer] = useState(false);
  const [habilitation, setHabilitation] = useState(false);
  const [searchByLocation, setSearchByLocation] = useState(false);
  const [available, setAvailable] = useState(false);
  const [localisation, setLocalisation] = useState(false);
  const [departement, setDepartement] = useState(null);

  const onChangeSearch = useCallback(
    (event) => {
      setCurrentOffset(0);
      setSearchText(event.target.value);
    },
    [setCurrentOffset, setSearchText]
  );

  const onChangeLocalisation = useCallback(
    (value) => {
      setCurrentOffset(0);
      setLocalisation(value);
    },
    [setCurrentOffset, setLocalisation]
  );

  const onChangeSearchByLocation = useCallback(() => {
    setCurrentOffset(0);
    setOrderBy(searchByLocation ? 0 : null);
    setSearchByLocation(!searchByLocation);
    setLocalisation("");
    setSearchText("");
  }, [
    setCurrentOffset,
    setLocalisation,
    setSearchByLocation,
    setSearchText,
    searchByLocation,
  ]);

  const onChangeType = useCallback(
    (option) => {
      setCurrentOffset(0);
      setType(option);
    },
    [setCurrentOffset, setType]
  );
  const onChangeDepartement = useCallback(
    (option) => {
      setCurrentOffset(0);
      setDepartement(option);
    },
    [setCurrentOffset, setDepartement]
  );
  const onChangeHabilitation = useCallback(() => {
    setCurrentOffset(0);
    setHabilitation(!habilitation);
  }, [setCurrentOffset, setHabilitation, habilitation]);
  const onChangePrefer = useCallback(() => {
    setCurrentOffset(0);
    setPrefer(!prefer);
  }, [setCurrentOffset, setPrefer, prefer]);
  const onChangeAvailable = useCallback(() => {
    setCurrentOffset(0);
    setAvailable(!available);
  }, [setCurrentOffset, setAvailable, available]);

  const onChangeOrderBy = useCallback(
    (value) => {
      if (value === "localisation") {
        setSearchText("");
      } else {
        setLocalisation(null);
      }
      setCurrentOffset(0);
      setOrderBy(value);
    },
    [setOrderBy, setCurrentOffset, setLocalisation, setSearchText]
  );

  return (
    <Box sx={MagistratMandatairesListStyle}>
      <MagistratMandatairesListFilters
        {...{
          onChangeSearch,
          searchText,
          selectedType,
          onChangeType,
          orderBy,
          onChangeOrderBy,
          prefer,
          onChangePrefer,
          habilitation,
          onChangeHabilitation,
          searchByLocation,
          onChangeSearchByLocation,
          available,
          onChangeAvailable,
          localisation,
          onChangeLocalisation,
          departement,
          onChangeDepartement,
        }}
      />
      <MagistratMandatairesListList
        {...{
          orderBy,
          debouncedSearchText,
          setCurrentOffset,
          currentOffset,
          selectedType,
          prefer,
          habilitation,
          available,
          localisation,
          departement,
        }}
      />
    </Box>
  );
}

export { MagistratMandatairesList };
