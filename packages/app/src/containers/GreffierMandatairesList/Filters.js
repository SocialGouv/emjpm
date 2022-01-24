import { useMemo } from "react";
import { Box, Flex } from "rebass";

import { CheckShield } from "@styled-icons/boxicons-solid/CheckShield";
import { Star } from "@styled-icons/fa-solid/Star";
import { DotCircle } from "@styled-icons/fa-regular/DotCircle";
import { Location } from "@styled-icons/entypo/Location";

import { Card, Input, Select, Button } from "~/components";

import SelectAdresse from "./SelectAdresse";

import { styleFilterButton } from "./style";

import { createDepartementOptions, departementList } from "~/utils/geodata";
import { findOption } from "~/utils/form";

const extraIconsSize = 18;

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
    label: "ordre alphabétique (A-Z)",
    value: 1,
  },
  {
    label: "ordre alphabétique (Z-A)",
    value: 2,
  },
];

function GreffierMandatairesListFilters(props) {
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
    searchByLocation,
    onChangeSearchByLocation,
    available,
    onChangeAvailable,
    localisation,
    onChangeLocalisation,
    departement,
    onChangeDepartement,
  } = props;

  const departementOptions = useMemo(
    () => createDepartementOptions(departementList),
    []
  );

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
          <Box width="200px" mr="2">
            <Select
              instanceId={"direction-departement-filter"}
              size="small"
              options={departementOptions}
              label={"Département d'habilitation"}
              placeholder={"Département d'habilitation"}
              value={findOption(departementOptions, departement || null)}
              onChange={(option) => onChangeDepartement(option.value)}
            />
          </Box>
          {!searchByLocation && (
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
          )}
          {searchByLocation && (
            <Box width="240px" mr={1}>
              <SelectAdresse
                label="Ville ou Code Postal"
                placeholder="rechercher par localisation"
                onChange={onChangeLocalisation}
                value={localisation}
              />
            </Box>
          )}
          {!searchByLocation && (
            <Box width="220px" mr={1}>
              <Input
                value={searchText || ""}
                spellCheck="false"
                autoComplete="false"
                onChange={onChangeSearch}
                name="search"
                size="small"
                label="Rechercher"
                forceActive
                placeholder="nom, email, code postal, ville..."
              />
            </Box>
          )}
        </Flex>
        <Flex alignItems="center">
          <Box mr={1}>
            <Button
              variant="outline"
              p={1}
              style={styleFilterButton(searchByLocation)}
              onClick={onChangeSearchByLocation}
              data-tip={
                !searchByLocation
                  ? "Rechercher les mandataire à proximité d'une localisation et les trier par distance, de la plus proche à la plus éloignée."
                  : null
              }
            >
              <Location
                size={extraIconsSize}
                color={searchByLocation ? "#70D54F" : ""}
              />
            </Button>
          </Box>
          <Box mr={1}>
            <Button
              variant="outline"
              p={1}
              style={styleFilterButton(habilitation)}
              onClick={onChangeHabilitation}
              data-tip={
                !habilitation
                  ? "Afficher uniquement les mandataires ayant une habilitation vérifiée par la DD"
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
              p={1}
              onClick={onChangePrefer}
              style={styleFilterButton(prefer)}
              data-tip={
                !prefer
                  ? "Afficher uniquement les mandataires souhaitant recevoir des mesures en provenance de votre tribunal"
                  : null
              }
            >
              <Star size={extraIconsSize} color={prefer ? "#70D54F" : ""} />
            </Button>
          </Box>
          <Box mr={0}>
            <Button
              variant="outline"
              p={1}
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

export { GreffierMandatairesListFilters };
