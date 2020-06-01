import { useQuery } from "@apollo/react-hooks";
import { Card, Input, Select } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { departementToOptions } from "../../util/option/OptionUtil";
import { FiltersContext } from "./context";
import { GET_DEPARTEMENTS } from "./queries";
import { BoxStyle } from "./style";

const TYPE_OPTIONS = [
  { label: "Tous les types", value: null },
  { label: "Mandataire individuel", value: "individuel" },
  { label: "Mandataire préposé d'établissement", value: "prepose" },
  { label: "Membre d'un service mandataire", value: "service" },
  { label: "Magistrat", value: "ti" }
];

const ListeBlancheFilter = () => {
  const { data: departementsData, loading, error } = useQuery(GET_DEPARTEMENTS);
  const {
    selectedDepartement,
    selectDepartement,
    selectedType,
    selectType,
    searchText,
    changeSearchText
  } = useContext(FiltersContext);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const allDepartments = departementsData.departements;
  const departmentOptions = departementToOptions(allDepartments);

  return (
    <Card>
      <Flex>
        <Box sx={BoxStyle}>
          <Select
            size="small"
            options={departmentOptions}
            placeholder={"Département"}
            value={selectedDepartement}
            onChange={option => selectDepartement(option)}
          />
        </Box>
        <Box sx={BoxStyle}>
          <Select
            size="small"
            options={TYPE_OPTIONS}
            placeholder={"Type"}
            value={selectedType}
            onChange={option => selectType(option)}
          />
        </Box>
        <Box sx={BoxStyle}>
          <Input
            value={searchText}
            spellCheck="false"
            autoComplete="false"
            onChange={event => changeSearchText(event.target.value)}
            name="search"
            size="small"
            placeholder="Nom"
          />
        </Box>
      </Flex>
    </Card>
  );
};

export { ListeBlancheFilter };
