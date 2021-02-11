import { useContext } from "react";
import { Box, Flex } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { Button, Card, Input, Select, Text } from "~/components";
import { useDepartementsOptions } from "~/utils/departements";
import { findOption } from "~/utils/form";

import { AdminFilterContext } from "./context";
import { AdminFilterBarStyle, FilterTextStyle } from "./style";

const TYPE_OPTIONS = [
  { label: "Tous les types", value: null },
  { label: "Mandataire individuel", value: "individuel" },
  { label: "Mandataire préposé d'établissement", value: "prepose" },
  { label: "Membre d'un service", value: "service" },
  { label: "Magistrat", value: "ti" },
  { label: "Direction", value: "direction" },
  { label: "Admin", value: "admin" },
];

const departementsOptionsConfig = {
  nullOption: {
    label: "Tous les départements",
  },
};

function AdminFilterBar({
  onAddButtonClick,
  userTypeFilter,
  useDepartementfilter,
}) {
  const { departementsOptions, error, loading } = useDepartementsOptions(
    departementsOptionsConfig
  );

  const {
    searchText,
    changeSearchText,
    selectedType,
    selectType,
    selectedDepartementCode,
    selectDepartementCode,
  } = useContext(AdminFilterContext);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <Card mt="3" sx={AdminFilterBarStyle} mb={2}>
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={FilterTextStyle}>AFFINER LES RÉSULTATS</Text>
            <Box width="170px" mr={1}>
              <Input
                value={searchText}
                spellCheck="false"
                autoComplete="false"
                onChange={(event) => changeSearchText(event.target.value)}
                name="search"
                size="small"
                placeholder="Filtre"
              />
            </Box>
            {userTypeFilter && (
              <Box width="170px" mr={1}>
                <Select
                  instanceId={"user-type-filter"}
                  value={TYPE_OPTIONS.find((elm) => elm.value === selectedType)}
                  options={TYPE_OPTIONS}
                  onChange={(option) => selectType(option.value)}
                  name="type"
                  size="small"
                  placeholder="Type"
                />
              </Box>
            )}
            {useDepartementfilter && (
              <Box width="250px" mr={1}>
                <Select
                  instanceId={"departement-filter"}
                  value={findOption(
                    departementsOptions,
                    selectedDepartementCode
                  )}
                  options={departementsOptions}
                  onChange={(option) => selectDepartementCode(option.value)}
                  name="departement"
                  size="small"
                  placeholder="Département"
                />
              </Box>
            )}
          </Flex>
        </Box>
        {onAddButtonClick && (
          <Box>
            <Button width="120px" onClick={onAddButtonClick}>
              Ajouter
            </Button>
          </Box>
        )}
      </Flex>
    </Card>
  );
}

export { AdminFilterBar };
