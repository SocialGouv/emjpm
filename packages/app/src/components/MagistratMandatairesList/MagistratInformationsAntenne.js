import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { SERVICE_ANTENNES } from "./queries";
import { boxStyle } from "./style";

const countColor = isOvercapacity => {
  return {
    color: isOvercapacity ? "error" : "success"
  };
};

const MagistratInformationsAntenne = props => {
  const { serviceId } = props;
  const { data, error, loading } = useQuery(SERVICE_ANTENNES, {
    variables: {
      serviceId: serviceId
    }
  });

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const { service_antenne } = data;

  if (service_antenne.length < 1) {
    return null;
  }

  return (
    <Box sx={{ mt: 1, width: "100%" }}>
      <Heading3 mb="2">Liste des antennes du service</Heading3>
      <Box
        css={{
          display: "grid",
          gridGap: "1%",
          gridTemplateColumns: "repeat(auto-fit, minmax(24%, 49%))"
        }}
      >
        {service_antenne.map(antenne => {
          return (
            <Card sx={boxStyle} bg="white" key={antenne.id}>
              <Flex>
                <Box width="60%">
                  <Heading4 mb="4px">{antenne.name}</Heading4>
                  <Text>
                    {antenne.address_zip_code} {antenne.address_city}
                  </Text>
                </Box>
                <Box width="40%" textAlign="right">
                  <Heading4 sx={countColor(antenne.mesures_in_progress >= antenne.mesures_max)}>
                    {antenne.mesures_in_progress}/{antenne.mesures_max}
                  </Heading4>
                </Box>
              </Flex>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

MagistratInformationsAntenne.propTypes = {
  serviceId: PropTypes.number
};
export { MagistratInformationsAntenne };
