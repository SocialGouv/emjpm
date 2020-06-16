import { useQuery } from "@apollo/react-hooks";
import { Select, Text } from "@emjpm/ui";
import React, { useMemo } from "react";
import { Box, Button, Flex } from "rebass";

import { SERVICE_ANTENNES } from "./queries";

const ServiceMesureAntennesMatcher = ({ serviceId, invalidAntenneNames, onSubmitAntennesMap }) => {
  const { data, loading, error } = useQuery(SERVICE_ANTENNES, {
    variables: { service_id: serviceId },
  });

  const serviceAntennes = useMemo(() => (data && data.antennes ? data.antennes : []), [data]);
  const antenneOptions = useMemo(
    () => serviceAntennes.map((a) => ({ label: a.name, value: a.id })),
    [serviceAntennes]
  );

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
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
    <form onSubmit={handleSubmit}>
      <Box mb={4}>
        <Text color="textSecondary" mb={4} width="50%" lineHeight={1.5}>
          {`Certaines antennes ne sont pas reconnues, associez les à des antennes eMJPM existantes pour continuer l'import.`}
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
              <Select
                name={`select-${index}`}
                isSearchable={false}
                defaultValue={antenneOptions.length ? antenneOptions[0] : undefined}
                placeholder
                options={antenneOptions}
                size="small"
              />
            </Box>
          </Flex>
        ))}
        <Button type="submit" mb={1}>{`Importez les mesures`}</Button>
      </Box>
    </form>
  );
};

export { ServiceMesureAntennesMatcher };
