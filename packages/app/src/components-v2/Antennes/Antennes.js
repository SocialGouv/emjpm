import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box } from "rebass";
import { Card, Text, BoxWrapper, Spinner, Heading4 } from "@socialgouv/emjpm-ui-core";

import { ANTENNE } from "./queries";

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
  console.log(service_antenne);
  return (
    <BoxWrapper>
      <Box sx={AntennesStyle} {...props}>
        {service_antenne.map(antenne => {
          return (
            <Card key={antenne.id}>
              <Heading4 sx={{ textAlign: "center" }}>{antenne.name}</Heading4>
              <Text>{antenne.mesures_max} mesures souhaitées</Text>
              <Text>{antenne.mesures_in_progress} mesures en cours</Text>
            </Card>
          );
        })}
      </Box>
    </BoxWrapper>
  );
};

export { Antennes };
