import { MESURE_PROTECTION } from "@emjpm/core";
import { Card, Input, Select } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import {
  DEFAULT_MESURE_NATURE,
  MESURE_SORTBY_LABEL_VALUE,
  MESURE_STATUS_LABEL_VALUE,
} from "../../constants/mesures";
import { FiltersContext } from "./context";

const MesureListFilters = (props) => {
  const { service_antennes = [] } = props;

  const {
    natureMesure,
    changeNatureMesure,
    mesureStatus,
    changeMesureStatus,
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
  ];

  return (
    <Card mt="1">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            {service_antennes.length >= 2 && (
              <Box width="170px" mr={1}>
                <Select
                  size="small"
                  options={antenneOptions}
                  placeholder={"Antenne"}
                  value={antenne}
                  onChange={(option) => changeAntenne(option)}
                />
              </Box>
            )}
            <Box width="200px" mr={1}>
              <Select
                size="small"
                options={[DEFAULT_MESURE_NATURE].concat(
                  MESURE_PROTECTION.NATURE_MESURE.options
                )}
                placeholder={"Nature de la mesure"}
                value={natureMesure}
                onChange={(option) => changeNatureMesure(option)}
              />
            </Box>
            <Box width="200px" mr={1}>
              <Select
                size="small"
                options={MESURE_STATUS_LABEL_VALUE}
                placeholder={"État de la mesure"}
                value={mesureStatus}
                onChange={(option) => changeMesureStatus(option)}
              />
            </Box>
            <Box width="200px" mr={1}>
              <Select
                size="small"
                options={MESURE_SORTBY_LABEL_VALUE}
                placeholder={"Trier par"}
                value={sortBy}
                onChange={(option) => changeSortBy(option)}
              />
            </Box>
          </Flex>
        </Box>
        <Box width="250px">
          <Input
            value={searchText}
            spellCheck="false"
            autoComplete="false"
            onChange={(event) => changeSearchText(event.target.value)}
            name="search"
            size="small"
            placeholder="Rechercher une mesure"
          />
        </Box>
      </Flex>
    </Card>
  );
};

export { MesureListFilters };
