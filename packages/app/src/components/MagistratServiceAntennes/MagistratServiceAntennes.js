import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3, Heading4, Spinner } from "@emjpm/ui";
import { Antenne } from "@socialgouv/emjpm-ui-components";
import PropTypes from "prop-types";
import React from "react";
import { Box } from "rebass";

import { SERVICE_ANTENNES } from "./queries";

const MagistratServiceAntennes = props => {
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
    <Box>
      <Heading3 mt="4" mb="3">
        Liste des antennes du service
      </Heading3>
      <Box
        css={{
          display: "grid",
          gridGap: 15,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]
        }}
      >
        {service_antenne.map(antenne => {
          antenne = { ...antenne, preferences: [] };
          return (
            <Antenne
              sx={{ minHeight: "200px", p: "3" }}
              key={antenne.id}
              antenne={antenne}
              hasButton={false}
            />
          );
        })}
      </Box>
    </Box>
  );
};

MagistratServiceAntennes.propTypes = {
  serviceId: PropTypes.number
};

export { MagistratServiceAntennes };
