import { Card, Input, Select } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { DEFAULT_MESURE_TYPE, MESURE_TYPE_LABEL_VALUE } from "../../constants/mesures";
import { FiltersContext } from "./context";
import { TextStyle } from "./style";

const MagistratFilters = () => {
  const { mesureType, changeMesureType, searchText, changeSearchText } = useContext(FiltersContext);

  return (
    <Card mt="3">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>AFFINER LES RÉSULTATS</Text>
            <Box width="200px" mr={1}>
              <Select
                size="small"
                options={[DEFAULT_MESURE_TYPE].concat(MESURE_TYPE_LABEL_VALUE)}
                placeholder={"Type de mesure"}
                value={mesureType}
                onChange={option => changeMesureType(option)}
              />
            </Box>
            <Box width="200px" mr={1}>
              <Input
                value={searchText}
                spellCheck="false"
                autoComplete="false"
                onChange={event => changeSearchText(event.target.value)}
                name="search"
                size="small"
                placeholder="Numéro RG"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};
export { MagistratFilters };
