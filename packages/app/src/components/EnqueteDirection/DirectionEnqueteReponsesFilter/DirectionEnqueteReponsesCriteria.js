import { Card, Select } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LoadingWrapper } from "~/components/Commons";
import { useDepartementsOptions } from "~/util/departements";

import { BoxStyle } from "./style";

const USER_TYPE_OPTIONS = [
  { label: "Tous les types", value: null },
  { label: "Mandataire individuel", value: "individuel" },
  { label: "Mandataire préposé d'établissement", value: "prepose" },
  { label: "Service", value: "service" },
];

export const ENQUETE_REPONSE_STATUS_OPTIONS = [
  { label: "Tous les status", value: null },
  { label: "En cours", value: "draft" },
  { label: "Réponse reçue", value: "submitted" },
];
const departementsOptionsConfig = {
  nullOption: {
    label: "Tous les départements",
  },
};
const DirectionEnqueteReponsesCriteria = ({ criteria, updateCriteria }) => {
  const { departementsOptions, error, loading } = useDepartementsOptions(
    departementsOptionsConfig
  );

  return (
    <LoadingWrapper error={error} loading={loading}>
      <Card>
        <Flex flexDirection="row">
          <Box sx={BoxStyle}>
            <Select
              size="small"
              options={departementsOptions}
              placeholder={"Département"}
              value={criteria.selectedDepartement}
              onChange={(option) =>
                updateCriteria("selectedDepartement", option)
              }
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
