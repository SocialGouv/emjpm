import { MESURE_PROTECTION } from "@emjpm/core";
import { Card, Input, Select } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { DEFAULT_MESURE_NATURE, MESURE_STATUS_LABEL_VALUE } from "../../constants/mesures";
import { FiltersContext } from "./context";
import { TextStyle } from "./style";

const MandataireFilters = (props) => {
  const { isStatusHidden } = props;

  const {
    natureMesure,
    changeNatureMesure,
    mesureStatus,
    changeMesureStatus,
    searchText,
    changeSearchText,
  } = useContext(FiltersContext);

  return (
    <Card mt="3">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>AFFINER LES RÉSULTATS</Text>
            <Box width="200px" mr={1}>
              <Select
                size="small"
                instanceId={"natureMesure"}
                options={[DEFAULT_MESURE_NATURE].concat(MESURE_PROTECTION.NATURE_MESURE.options)}
                placeholder={"nature de la mesure"}
                value={natureMesure}
                onChange={(option) => changeNatureMesure(option)}
              />
            </Box>
            {!isStatusHidden && (
              <Box width="200px" mr={1}>
                <Select
                  size="small"
                  instanceId={"mesureStatus"}
                  options={MESURE_STATUS_LABEL_VALUE}
                  placeholder={"état de la mesure"}
                  value={mesureStatus}
                  onChange={(option) => changeMesureStatus(option)}
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
            onChange={(event) => changeSearchText(event.target.value)}
            name="search"
            size="small"
            placeholder="n° RG ou n° dossier"
          />
        </Box>
      </Flex>
    </Card>
  );
};

export { MandataireFilters };
