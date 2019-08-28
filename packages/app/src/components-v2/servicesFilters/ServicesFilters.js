import React from "react";
import { Card, Select } from "@socialgouv/emjpm-ui-core";
import { Box, Flex, Text } from "rebass";

const TextStyle = {
  textTransform: "uppercase",
  fontFamily: "body",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: ".76px",
  lineHeight: "44px",
  mr: 1
};

const ServicesFilters = () => {
  return (
    <Card mt="3">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>AFFINER LES RÉSULTATS</Text>
            <Box width="170px" mr={1}>
              <Select size="small" options={""} placeholder={"region"} value={""} onChange={""} />
            </Box>
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={""}
                placeholder={"departement"}
                value={""}
                onChange={""}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export { ServicesFilters };
