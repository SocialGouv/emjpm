import { Box, Flex } from "rebass";

import { LoadingWrapper } from "~/components/Commons";
import { Card, Select } from "~/ui";
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
function DirectionEnqueteReponsesCriteria({ criteria, updateCriteria }) {
  const { departementsOptions, error, loading } = useDepartementsOptions(
    departementsOptionsConfig
  );

  return (
    <LoadingWrapper error={error} loading={loading}>
      <Card>
        <Flex flexDirection="row">
          <Box sx={BoxStyle}>
            <Select
              instanceId={"departement-filter"}
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
              instanceId={"user-type-filter"}
              size="small"
              options={USER_TYPE_OPTIONS}
              placeholder={"Type"}
              value={criteria.userType}
              onChange={(option) => updateCriteria("userType", option)}
            />
          </Box>
          <Box sx={BoxStyle}>
            <Select
              instanceId={"enquete-reponse-statut-filter"}
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
}

export { DirectionEnqueteReponsesCriteria };
