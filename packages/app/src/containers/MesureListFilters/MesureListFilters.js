import { MESURE_PROTECTION } from "@emjpm/biz";
import { useContext, useMemo } from "react";
import { Box, Flex } from "rebass";

import {
  DEFAULT_MESURE_NATURE,
  MESURE_SORTBY_LABEL_VALUE,
  MESURE_STATUS_LABEL_VALUE,
} from "~/constants/mesures";
import { Card, Input, AccessibleSelect } from "~/components";

import { FiltersContext } from "./context";

import { createDepartementOptions, departementList } from "~/utils/geodata";

function MesureListFilters(props) {
  const { service_antennes = [] } = props;

  const {
    natureMesure,
    changeNatureMesure,
    mesureStatus,
    changeMesureStatus,
    changeMesureDepartement,
    mesureDepartement,
    antenne,
    changeAntenne,
    searchText,
    changeSearchText,
    sortBy,
    changeSortBy,
  } = useContext(FiltersContext);

  const antenneOptions = [
    {
      label: "Toutes les antennes",
      value: null,
    },
    ...service_antennes.map((antenne) => ({
      label: antenne.name,
      value: antenne.id,
    })),
    {
      label: "Sans antenne",
      value: false,
    },
  ];

  const departementsOptions = useMemo(
    () => createDepartementOptions(departementList),
    []
  );

  return (
    <Card mt="1">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            {service_antennes.length >= 1 && (
              <Box width="170px" mb={1} mr={1}>
                <AccessibleSelect
                  size="small"
                  options={antenneOptions}
                  placeholder={"Antenne"}
                  value={antenne}
                  onChange={(option) => changeAntenne(option)}
                />
              </Box>
            )}
            <Box width="200px" mb={1} mr={1}>
              <AccessibleSelect
                size="small"
                options={[DEFAULT_MESURE_NATURE].concat(
                  MESURE_PROTECTION.NATURE_MESURE.options
                )}
                placeholder={"Nature de la mesure"}
                value={natureMesure}
                onChange={(option) => changeNatureMesure(option)}
              />
            </Box>
            <Box width="200px" mb={1} mr={1}>
              <AccessibleSelect
                size="small"
                options={MESURE_STATUS_LABEL_VALUE}
                placeholder={"État de la mesure"}
                value={mesureStatus}
                onChange={(option) => changeMesureStatus(option)}
              />
            </Box>
            <Box width="200px" mb={1} mr={1}>
              <AccessibleSelect
                size="small"
                options={departementsOptions}
                label={"Département du majeur"}
                placeholder={"Tous"}
                value={mesureDepartement}
                onChange={(option) => changeMesureDepartement(option)}
              />
            </Box>
            <Box width="200px" mb={1} mr={1}>
              <AccessibleSelect
                size="small"
                options={MESURE_SORTBY_LABEL_VALUE}
                label="Trier par"
                placeholder="Aucun Tri"
                value={sortBy}
                onChange={(option) => changeSortBy(option)}
              />
            </Box>
          </Flex>
        </Box>
        <Box width="240px">
          <Input
            value={searchText}
            spellCheck="false"
            autoComplete="false"
            onChange={(event) => changeSearchText(event.target.value)}
            name="search"
            size="small"
            label="Rechercher une mesure"
            placeholder="Numéro RG, Dossier, Ville..."
            aria-label="Rechercher une mesure"
          />
        </Box>
      </Flex>
    </Card>
  );
}

export { MesureListFilters };
