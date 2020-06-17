import { useQuery } from "@apollo/react-hooks";
import { Card, CheckBox, Input, Select } from "@emjpm/ui";
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
];

const ListeBlancheFilter = () => {
  const { data: departementsData, loading, error } = useQuery(GET_DEPARTEMENTS);
  const {
    selectedDepartement,
    selectDepartement,
    departementFinanceur,
    toogleDepartementFinanceur,
    selectedType,
    selectType,
    searchNom,
    searchPrenom,
    changeSearchNom,
    changeSearchPrenom,
    searchSiret,
    changeSearchSiret,
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
      <Flex flexDirection="column">
        <Flex>
          <Box sx={BoxStyle}>
            <Select
              size="small"
              options={departmentOptions}
              placeholder={"Département"}
              value={selectedDepartement}
              onChange={(option) => selectDepartement(option)}
            />
          </Box>
          <Box mr={1} pt={2} width="100px">
            <CheckBox
              label="Financé"
              isChecked={departementFinanceur}
              onChange={() => toogleDepartementFinanceur(!departementFinanceur)}
            />
          </Box>
        </Flex>
        <Flex mt={2}>
          <Box sx={BoxStyle}>
            <Select
              size="small"
              options={TYPE_OPTIONS}
              placeholder={"Type"}
              value={selectedType}
              onChange={(option) => selectType(option)}
            />
          </Box>
          <Box sx={BoxStyle}>
            <Input
              value={searchNom}
              spellCheck="false"
              autoComplete="false"
              onChange={(event) => changeSearchNom(event.target.value)}
              name="search"
              size="small"
              placeholder="Nom"
            />
          </Box>
          <Box sx={BoxStyle}>
            <Input
              value={searchPrenom}
              spellCheck="false"
              autoComplete="false"
              onChange={(event) => changeSearchPrenom(event.target.value)}
              name="search"
              size="small"
              placeholder="Prénom"
            />
          </Box>
          <Box sx={BoxStyle}>
            <Input
              value={searchSiret}
              spellCheck="false"
              autoComplete="false"
              onChange={(event) => changeSearchSiret(event.target.value)}
              name="search"
              size="small"
              placeholder="Siret"
            />
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
};

export { ListeBlancheFilter };
