import { Card, CheckBox, Input, Select } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { departementToOptions } from "../../util/option/OptionUtil";
import { FiltersContextSerializable } from "./context";
import { BoxStyle } from "./style";

const TYPE_OPTIONS = [
  { label: "Tous les types", value: null },
  { label: "Mandataire individuel", value: "individuel" },
  { label: "Mandataire préposé d'établissement", value: "prepose" },
];

const ListeBlancheFilter = () => {
  const { loading, error, filters, onFilterChange, departements = [] } = useContext(
    FiltersContextSerializable
  );
  const { departementFinanceur, type, nom, prenom, siret } = filters;

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
              value={
                filters.departement
                  ? departmentOptions.find((d) => d.value === filters.departement)
                  : undefined
              }
              onChange={(option) => onFilterChange("departement", option.value)}
            />
          </Box>
          <Box mr={1} pt={2} width="100px">
            <CheckBox
              label="Financé"
              name="departementFinanceur"
              isChecked={departementFinanceur || false}
              onChange={() => onFilterChange("departementFinanceur", !departementFinanceur)}
            />
          </Box>
        </Flex>
        <Flex mt={2}>
          <Box sx={BoxStyle}>
            <Select
              size="small"
              options={TYPE_OPTIONS}
              placeholder={"Type"}
              value={TYPE_OPTIONS.find(({ value }) => value === type)}
              onChange={(option) => onFilterChange("type", option.value)}
            />
          </Box>
          <Box sx={BoxStyle}>
            <Input
              value={nom || ""}
              spellCheck="false"
              autoComplete="false"
              onChange={(event) => onFilterChange("nom", event.target.value)}
              name="search"
              size="small"
              placeholder="Nom"
            />
          </Box>
          <Box sx={BoxStyle}>
            <Input
              value={prenom || ""}
              spellCheck="false"
              autoComplete="false"
              onChange={(event) => onFilterChange("prenom", event.target.value)}
              name="search"
              size="small"
              placeholder="Prénom"
            />
          </Box>
          <Box sx={BoxStyle}>
            <Input
              value={siret || ""}
              spellCheck="false"
              autoComplete="false"
              onChange={(event) => onFilterChange("siret", event.target.value)}
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
