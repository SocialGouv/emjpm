import React, { useState } from "react";
import { Card, Select, Input } from "@socialgouv/emjpm-ui-core";
import { Text, Flex, Box } from "rebass";

const TextStyle = {
  textTransform: "uppercase",
  fontFamily: "body",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: ".76px",
  lineHeight: "44px",
  mr: 1
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const Filters = () => {
  const [selectedRegionalValue, changeRegionalValue] = useState(false);
  const [selectedDepartementValue, changeDepartementValue] = useState(false);
  const [selectedTribunalValue, changeTribunalValue] = useState(false);

  return (
    <Card>
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>Affiner</Text>
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={options}
                placeholder={"region"}
                value={selectedRegionalValue}
                onChange={selectedOption => changeRegionalValue(selectedOption)}
              />
            </Box>
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={options}
                placeholder={"departement"}
                value={selectedDepartementValue}
                onChange={selectedOption => changeDepartementValue(selectedOption)}
              />
            </Box>
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={options}
                placeholder={"tribunal"}
                value={selectedTribunalValue}
                onChange={selectedOption => changeTribunalValue(selectedOption)}
              />
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Box width="170px" mr={1}>
              <Input name="startDate" size="small" type="date" placeholder="du" />
            </Box>
            <Box width="170px">
              <Input name="endDate" size="small" type="date" placeholder="au" />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export { Filters };
