import { Card, Select } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import { MESURE_TYPE_LABEL_VALUE } from "../../constants/mesures";
import { FiltersContext } from "./context";
import { TextStyle } from "./style";

const MagistratFilters = () => {
  const { mesureType, changeMesureType } = useContext(FiltersContext);

  return (
    <Card mt="3">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>AFFINER LES RÉSULTATS</Text>
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={MESURE_TYPE_LABEL_VALUE}
                placeholder={"type"}
                value={mesureType}
                onChange={option => changeMesureType(option)}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};
export { MagistratFilters };
