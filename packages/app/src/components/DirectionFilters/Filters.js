import { useQuery } from "@apollo/react-hooks";
import { Card, Input, Select } from "@socialgouv/emjpm-ui-core";
import React, { useContext, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { departementToOptions, regionsToOptions } from "../../util/option/OptionUtil";
import { FiltersContext } from "./context";
import { GET_REGIONS } from "./queries";
import { BoxStyle, SimpleBoxStyle, TextStyle } from "./style";

const Filters = () => {
  const { data: regionsData, loading, error } = useQuery(GET_REGIONS);
  const {
    selectedRegionalValue,
    changeRegionalValue,
    selectedDepartementValue,
    changeDepartementValue,
    startDateValue,
    changeStartDate,
    endDateValue,
    changeEndDate
  } = useContext(FiltersContext);

  const [departmentOptions, setDepartmentOptions] = useState([]);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const regionalOptions = regionsToOptions(regionsData.regions);

  const allDepartments = regionsData.regions.reduce((acc, current) => {
    Array.prototype.push.apply(acc, current.departements);
    return acc;
  }, []);
  const allDepartmentOptions = departementToOptions(allDepartments);

  const selectRegion = selectedOption => {
    changeRegionalValue(selectedOption);
    if (selectedOption && selectedOption.value) {
      const departments = regionsData.regions.find(region => region.id === selectedOption.value)
        .departements;
      setDepartmentOptions(departementToOptions(departments));
    } else {
      setDepartmentOptions(allDepartmentOptions);
    }

    changeDepartementValue(null);
  };

  return (
    <Card>
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>Affiner</Text>
            <Box sx={BoxStyle}>
              <Select
                size="small"
                options={regionalOptions}
                placeholder={"region"}
                value={selectedRegionalValue}
                onChange={selectedOption => selectRegion(selectedOption)}
              />
            </Box>
            <Box sx={BoxStyle}>
              <Select
                size="small"
                options={departmentOptions.length > 0 ? departmentOptions : allDepartmentOptions}
                placeholder={"departement"}
                value={selectedDepartementValue}
                onChange={selectedOption => changeDepartementValue(selectedOption)}
              />
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Box sx={BoxStyle}>
              <Input
                value={startDateValue}
                spellCheck="false"
                autoComplete="false"
                onChange={event => {
                  changeStartDate(event.target.value);
                }}
                name="startDate"
                size="small"
                type="date"
                placeholder="du"
              />
            </Box>
            <Box sx={SimpleBoxStyle}>
              <Input
                value={endDateValue}
                spellCheck="false"
                autoComplete="false"
                onChange={event => {
                  changeEndDate(event.target.value);
                }}
                name="endDate"
                size="small"
                type="date"
                placeholder="au"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export { Filters };
