import { Box, Flex } from "rebass";

import { Card, Input, Select, Text } from "~/components";

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

function MagistratMandatairesListFilters(props) {
  const {
    onChangeSearch,
    searchText,
    selectedType,
    onChangeType,
    orderBy,
    setOrderBy,
  } = props;

  return (
    <Card mb="2" mt="1">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexWrap="wrap">
          <Box width="200px" mr="2">
            <Select
              instanceId={"type-mandataire-filter"}
              size="small"
              placeholder="Type de mandataire"
              onChange={onChangeType}
              value={selectedType}
              options={optionsType}
            />
          </Box>
          <Box width="235px" mr={1}>
            <Input
              value={searchText || ""}
              spellCheck="false"
              autoComplete="false"
              onChange={onChangeSearch}
              name="search"
              size="small"
              label="Rechercher"
              placeholder="nom, email, code postal, ville..."
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
  );
}

export { MagistratMandatairesListFilters };
