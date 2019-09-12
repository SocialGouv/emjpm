import { useQuery } from "@apollo/react-hooks";
import { Card, Select } from "@socialgouv/emjpm-ui-core";
import React, { useContext, useState } from "react";
import { Box, Flex, Text } from "rebass";
import { departementToOptions, regionsToOptions } from "../../util/option/OptionUtil";
import { FiltersContext } from "./context";
import { GET_REGIONS } from "./queries";
import { TextStyle } from "./style";

const ServicesFilters = () => {
  const { data: regionsData, loading, error } = useQuery(GET_REGIONS);
  const {
    selectedRegionalValue,
    changeRegionalValue,
    selectedDepartementValue,
    changeDepartementValue
  } = useContext(FiltersContext);

  const [departmentOptions, setDepartmentOptions] = useState([]);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
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
    <Card mt="3">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>AFFINER LES RÉSULTATS</Text>
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
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};
export { ServicesFilters };
