import { Box, Flex } from "rebass";

import { CheckShield } from "@styled-icons/boxicons-solid/CheckShield";
import { Star } from "@styled-icons/fa-solid/Star";
import { DotCircle } from "@styled-icons/fa-regular/DotCircle";

import { Card, Input, Select, Button } from "~/components";

import SelectAdresse from "./SelectAdresse";

import { styleFilterButton } from "./style";

const extraIconsSize = 22;

const DEFAULT_VALUE = { label: "Tous les types", value: null };

const optionsType = [
  DEFAULT_VALUE,
  { label: "Préposé", value: "prepose" },
  { label: "Individuel", value: "individuel" },
  { label: "Service", value: "service" },
];

const orderByOptions = [
  {
    label: "disponibilité",
    value: 0,
  },
  {
    label: "localisation",
    value: 1,
  },
  {
    label: "ordre alphabétique (Z-A)",
    value: 2,
  },
  {
    label: "ordre alphabétique (Z-A)",
    value: 3,
  },
];

function MagistratMandatairesListFilters(props) {
  const {
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
    available,
    onChangeAvailable,
    localisation,
    onChangeLocalisation,
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
          <Box width="200px" mr={2}>
            <Select
              instanceId={"mandataire-sort"}
              size="small"
              label={"Trier par"}
              onChange={({ value }) => onChangeOrderBy(value)}
              value={orderByOptions.find(({ value }) => value === orderBy)}
              options={orderByOptions}
            />
          </Box>
          <Box width="235px" mr={1}>
            {orderBy === 1 && (
              <SelectAdresse
                label="Code Postal ou Ville"
                placeholder="rechercher par localisation"
                onChange={onChangeLocalisation}
                value={localisation}
              />
            )}
            {orderBy !== 1 && (
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
            )}
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Box mr={1}>
            <Button
              variant="outline"
              p={2}
              style={styleFilterButton(habilitation)}
              onClick={onChangeHabilitation}
              data-tip={
                !habilitation
                  ? "Afficher uniquement les mandataires ayant une habilitation vérifiée"
                  : null
              }
            >
              <CheckShield
                size={extraIconsSize}
                color={habilitation ? "#70D54F" : ""}
              />
            </Button>
          </Box>
          <Box mr={1}>
            <Button
              variant="outline"
              p={2}
              onClick={onChangePrefer}
              style={styleFilterButton(prefer)}
              data-tip={
                !prefer
                  ? "Afficher uniquement les mandataires souhaitant recevoirs des mesure en provenance de votre tribunal"
                  : null
              }
            >
              <Star size={extraIconsSize} color={prefer ? "#70D54F" : ""} />
            </Button>
          </Box>
          <Box mr={0}>
            <Button
              variant="outline"
              p={2}
              onClick={onChangeAvailable}
              style={styleFilterButton(available)}
              data-tip={
                !available
                  ? "Afficher uniquement les mandataire ayant des places disponibles"
                  : null
              }
            >
              <DotCircle
                size={extraIconsSize}
                color={available ? "#70D54F" : ""}
              />
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
}

export { MagistratMandatairesListFilters };
