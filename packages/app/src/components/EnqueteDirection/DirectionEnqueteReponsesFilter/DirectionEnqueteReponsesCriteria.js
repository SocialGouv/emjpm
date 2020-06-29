import { useQuery } from "@apollo/react-hooks";
import { Card, Input, Select } from "@emjpm/ui";
import { gql } from "apollo-boost";
import React, { useMemo } from "react";
import { Box, Flex } from "rebass";

import { LoadingWrapper } from "../../Commons";
import { BoxStyle } from "./style";
const GET_DEPARTEMENTS = gql`
  {
    departements(order_by: { nom: asc }) {
      code
      nom
    }
  }
`;

const USER_TYPE_OPTIONS = [
  { label: "Tous les types", value: null },
  { label: "Mandataire individuel", value: "individuel" },
  { label: "Mandataire préposé d'établissement", value: "prepose" },
  { label: "Service", value: "service" },
];

const ENQUETE_REPONSE_STATUS_OPTIONS = [
  { label: "Tous les status", value: null },
  { label: "En cours", value: "draft" },
  { label: "Réponse reçue", value: "submitted" },
];
const departementToOptions = (datas) => {
  const all = [
    {
      label: "Tous les départements",
      value: null,
    },
  ].concat(
    datas.map((data) => ({
      label: `${data["code"]} - ${data["nom"]}`,
      value: data["code"],
    }))
  );
  all.sort(function (a, b) {
    return a.label - b.label;
  });
  return all;
};
const DirectionEnqueteReponsesCriteria = ({ criteria, updateCriteria }) => {
  const { data: departementsData, loading, error } = useQuery(GET_DEPARTEMENTS);

  const departmentOptions = useMemo(() => {
    if (departementsData) {
      const allDepartments = departementsData.departements;
      const departmentOptions = departementToOptions(allDepartments);
      return departmentOptions;
    }
    return [];
  }, [departementsData]);

  return (
    <LoadingWrapper error={error} loading={loading}>
      <Card>
        <Flex flexDirection="row">
          <Box sx={BoxStyle}>
            <Input
              value={criteria.searchText}
              spellCheck="false"
              autoComplete="OFF"
              onChange={(event) => updateCriteria("searchText", event.target.value)}
              name="search"
              size="small"
              placeholder="Recherche par nom, ville"
            />
          </Box>
          <Box sx={BoxStyle}>
            <Select
              size="small"
              options={departmentOptions}
              placeholder={"Département"}
              value={criteria.selectedDepartement}
              onChange={(option) => updateCriteria("selectedDepartement", option)}
            />
          </Box>
          <Box sx={BoxStyle}>
            <Select
              size="small"
              options={USER_TYPE_OPTIONS}
              placeholder={"Type"}
              value={criteria.userType}
              onChange={(option) => updateCriteria("userType", option)}
            />
          </Box>
          <Box sx={BoxStyle}>
            <Select
              size="small"
              options={ENQUETE_REPONSE_STATUS_OPTIONS}
              placeholder={"Statut"}
              value={criteria.responseStatus}
              onChange={(option) => updateCriteria("responseStatus", option)}
            />
          </Box>
        </Flex>
      </Card>
    </LoadingWrapper>
  );
};

export { DirectionEnqueteReponsesCriteria };
