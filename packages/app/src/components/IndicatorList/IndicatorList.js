import { useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Spinner, Text } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { INDICATORS } from "./queries";
import { IndicatorListStyle } from "./style";

const IndicatorList = props => {
  const { data, error, loading } = useQuery(INDICATORS);

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

  const indicators = data.view_indicateur_inscrit.map(inscrit => {
    var login = data.view_indicateur_login.find(function(element) {
      return element.nom === inscrit.nom;
    });
    return {
      departement: inscrit.nom,
      inscriptionCount: inscrit.count,
      loginCount: login ? login.count : null
    };
  });

  return (
    <Box sx={IndicatorListStyle} {...props}>
      {indicators.map((indicators, index) => {
        const basePercent = 100 / indicators.inscriptionCount;
        const width = indicators.loginCount * basePercent;
        return (
          <Card
            key={`${index}-${indicators.departement}`}
            p="4"
            mb="3"
            sx={{ borderRadius: "15px" }}
          >
            <Box
              sx={{
                display: "grid",
                gridGap: 1,
                gridTemplateColumns: ["repeat(4, 1fr)"]
              }}
            >
              <Heading4>{indicators.departement}</Heading4>
              <Text>{`${indicators.inscriptionCount} inscription`}</Text>
              <Text>
                {indicators.loginCount
                  ? `${indicators.loginCount} Connection dans les 30 derniers jours`
                  : "Pas de connection"}
              </Text>
              <Box
                sx={{
                  bg: "primary",
                  borderRadius: "15px",
                  overflow: "hidden",
                  mt: "3px",
                  height: "10px"
                }}
              >
                <Box
                  sx={{ width: `${width}%`, bg: "error", height: "10px", borderRadius: "15px" }}
                />
              </Box>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};

export { IndicatorList };
