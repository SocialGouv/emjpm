import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { Box, Button, Flex } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { AccessibleSelect, Text } from "~/components";
import { Warning } from "@styled-icons/material/Warning";

import styled from "styled-components";

const StyledWarning = styled(Warning)`
  margin-right: 10px;
  color: orange;
`;

import { SERVICE_ANTENNES } from "./queries";

function ServiceMesureAntennesMatcher({
  serviceId,
  invalidAntenneNames,
  onSubmitAntennesMap,
  reset,
}) {
  const { data, loading, error } = useQuery(SERVICE_ANTENNES, {
    variables: { service_id: serviceId },
  });

  const serviceAntennes = useMemo(
    () => (data && data.antennes ? data.antennes : []),
    [data]
  );
  const antenneOptions = useMemo(
    () => serviceAntennes.map((a) => ({ label: a.name, value: a.id })),
    [serviceAntennes]
  );

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // get associations via select values
    const antennesMap = invalidAntenneNames.reduce((acc, a, i) => {
      acc[a] = event.target.elements[`select-${i}`].value;
      return acc;
    }, {});

    if (onSubmitAntennesMap) {
      onSubmitAntennesMap({
        antennesMap,
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Box mb={4}>
        <Text color="textSecondary" mt={2} mb={4} width="100%" lineHeight={1.5}>
          <StyledWarning size="18" />
          {
            "Certaines antennes ne sont pas reconnues, associez les à des antennes eMJPM existantes pour continuer l'import."
          }
        </Text>
        {invalidAntenneNames.map((antenne, index) => (
          <Flex key={antenne} mb={1} alignItems="center">
            <Box color="primary" width={100}>
              {antenne}
            </Box>
            <Box width={100} color="textSecondary">
              correspond à
            </Box>
            <Box width={200}>
              <AccessibleSelect
                instanceId={`antenne-select-${index}`}
                name={`select-${index}`}
                isSearchable={false}
                defaultValue={
                  antenneOptions.length ? antenneOptions[0] : undefined
                }
                placeholder
                options={antenneOptions}
                size="small"
              />
            </Box>
          </Flex>
        ))}
        <Button type="submit" mt={4} mb={1} mr={5}>
          {"Importez les mesures"}
        </Button>
        ou
        <Button variant="outline" mt={4} onClick={reset} ml={5}>
          Sélectionner un autre fichier
        </Button>
      </Box>
    </form>
  );
}

export { ServiceMesureAntennesMatcher };
