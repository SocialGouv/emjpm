import { Card, CheckBox, Input, Select } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { departementToOptions } from "../../util/option/OptionUtil";
import { FiltersContext } from "./context";
import { BoxStyle } from "./style";

const TYPE_OPTIONS = [
  { label: "Tous les types", value: null },
  { label: "Mandataire individuel", value: "individuel" },
  { label: "Mandataire préposé d'établissement", value: "prepose" },
];

const ListeBlancheFilter = () => {
  const {
    departements,
    searchDepartement,
    loading,
    error,
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
    filterDepartement,
  } = useContext(FiltersContext);

  if (loading) {
    return <div>{"Chargement..."}</div>;
  }

  if (error) {
    return <div>{"Oups, une erreur s'est produite. Veuillez réessayer ultérieurement."}</div>;
  }

  const departmentOptions = departementToOptions(departements);

  return (
    <Card>
      <Flex flexDirection="column">
        <Flex>
          <Box sx={BoxStyle}>
            <Select
              size="small"
              options={departmentOptions}
              placeholder={"Département"}
              value={filterDepartement}
              onChange={(option) => searchDepartement(option)}
            />
          </Box>
          <Box mr={1} pt={2} width="100px">
            <CheckBox
              label="Financé"
              name="departementFinanceur"
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
