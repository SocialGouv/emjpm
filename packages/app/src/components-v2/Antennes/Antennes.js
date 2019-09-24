import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box } from "rebass";
import { Card, BoxWrapper, Spinner } from "@socialgouv/emjpm-ui-core";
import { Antenne } from "@socialgouv/emjpm-ui-components";
import { ANTENNE } from "./queries";
import { LinkButton } from "../Commons";

import { AntennesStyle } from "./style";

const Antennes = props => {
  const { data, loading, error } = useQuery(ANTENNE);

  if (loading) {
    return (
      <Card p="1" minHeight="450px">
        <Box sx={{ position: "relative", p: "6" }}>
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card p="1">
        <Box sx={{ position: "relative", p: "6" }}>error</Box>
      </Card>
    );
  }

  const { service_antenne } = data;

  return (
    <BoxWrapper>
      <Box sx={AntennesStyle} {...props}>
        {service_antenne.map(antenne => {
          antenne = { ...antenne, preferences: [] };
          return (
            <Antenne
              sx={{ p: "3", minHeight: "300px" }}
              key={antenne.id}
              antenne={antenne}
              linkText="Voir l'antenne"
              href={`/services/antennes/${antenne.id}`}
              Link={LinkButton}
            />
          );
        })}
      </Box>
    </BoxWrapper>
  );
};

export { Antennes };
