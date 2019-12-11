import { Card, Input, Select } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { MESURE_STATUS_LABEL_VALUE, MESURE_TYPE_LABEL_VALUE } from "../../constants/mesures";
import { FiltersContext } from "./context";
import { TextStyle } from "./style";

const ServicesFilters = props => {
  const { isStatusHidden, user_antennes } = props;

  const {
    mesureType,
    changeMesureType,
    mesureStatus,
    changeMesureStatus,
    antenne,
    changeAntenne,
    searchText,
    changeSearchText
  } = useContext(FiltersContext);

  const antenneOptions = [
    {
      label: "Toutes les antennes",
      value: null
    }
  ];

  Array.prototype.push.apply(
    antenneOptions,
    user_antennes.map(user_antenne => ({
      label: user_antenne.service_antenne.name,
      value: user_antenne.service_antenne.id
    }))
  );

  return (
    <Card mt="3">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>AFFINER LES RÉSULTATS</Text>
            {user_antennes.length >= 2 && (
              <Box width="170px" mr={1}>
                <Select
                  size="small"
                  options={antenneOptions}
                  placeholder={"Antenne"}
                  value={antenne}
                  onChange={option => changeAntenne(option)}
                />
              </Box>
            )}
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={MESURE_TYPE_LABEL_VALUE}
                placeholder={"Type"}
                value={mesureType}
                onChange={option => changeMesureType(option)}
              />
            </Box>
            {!isStatusHidden && (
              <Box width="170px" mr={1}>
                <Select
                  size="small"
                  options={MESURE_STATUS_LABEL_VALUE}
                  placeholder={"État"}
                  value={mesureStatus}
                  onChange={option => changeMesureStatus(option)}
                />
              </Box>
            )}
          </Flex>
        </Box>
        <Box width="250px">
          <Input
            value={searchText}
            spellCheck="false"
            autoComplete="false"
            onChange={event => changeSearchText(event.target.value)}
            name="search"
            size="small"
            placeholder="Rechercher une mesure"
          />
        </Box>
      </Flex>
    </Card>
  );
};

export { ServicesFilters };
