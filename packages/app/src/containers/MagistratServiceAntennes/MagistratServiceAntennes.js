import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";

import { Box, Flex } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { Card, Heading, Spinner } from "~/components";
import Antenne from "~/containers/Antenne";

import { SERVICE_ANTENNES } from "./queries";

function MagistratServiceAntennes(props) {
  const { serviceId } = props;
  const { data, error, loading } = useQuery(SERVICE_ANTENNES, {
    variables: {
      serviceId: serviceId,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { service_antenne } = data;

  if (service_antenne.length < 1) {
    return null;
  }

  return (
    <Box>
      <Heading size={3} mt="4" mb="3">
        Liste des antennes du service
      </Heading>
      <Flex flexWrap="wrap" justifyContent="space-around">
        {service_antenne.map((antenne) => {
          antenne = { ...antenne, preferences: [] };
          return (
            <Antenne
              sx={{ m: "1", minHeight: "200px", p: "3", width: "250px" }}
              key={antenne.id}
              antenne={antenne}
              hasButton={false}
            />
          );
        })}
      </Flex>
    </Box>
  );
}

MagistratServiceAntennes.propTypes = {
  serviceId: PropTypes.number,
};

export { MagistratServiceAntennes };
