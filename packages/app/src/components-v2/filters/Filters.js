import { useQuery } from "@apollo/react-hooks";
import { Card, Input, Select } from "@socialgouv/emjpm-ui-core";
import React, { useContext, useState } from "react";
import { Box, Flex, Text } from "rebass";
import { GET_REGIONS } from "../../graphql/Queries";
import { departementToOptions, regionsToOptions } from "../../util/option/OptionUtil";
import { FiltersContext } from "./context";

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
  const { data: regionsData, loading } = useQuery(GET_REGIONS);

  const {
    selectedRegionalValue,
    changeRegionalValue,
    selectedDepartementValue,
    changeDepartementValue,
    selectedTribunalValue,
    changeTribunalValue
  } = useContext(FiltersContext);

  const [departmentOptions, setDepartmentOptions] = useState([]);

  if (loading) {
    return <div>loading</div>;
  }

  const regionalOptions = regionsToOptions(regionsData.regions);

  const selectRegion = selectedOption => {
    changeRegionalValue(selectedOption);
    const departments = regionsData.regions.find(region => region.id === selectedOption.value)
      .departements;
    setDepartmentOptions(departementToOptions(departments));
    changeDepartementValue(null);
  };

  return (
    <Card>
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>Affiner</Text>
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={regionalOptions}
                placeholder={"region"}
                value={selectedRegionalValue}
                onChange={selectedOption => selectRegion(selectedOption)}
              />
            </Box>
            <Box width="170px" mr={1}>
              <Select
                size="small"
                options={departmentOptions}
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
