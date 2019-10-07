import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box, Flex } from "rebass";
import { Heading2, Text, Heading4, Card, BoxWrapper, Spinner } from "@socialgouv/emjpm-ui-core";
import { Antenne } from "@socialgouv/emjpm-ui-components";
import { ANTENNE } from "./queries";
import { AntenneLinkButton, LinkButton } from "../Commons";

import { AntennesStyle } from "./style";

const ServiceAntennes = props => {
  const { data, loading, error } = useQuery(ANTENNE, { fetchPolicy: "cache-and-network" });

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
      {service_antenne.length < 2 && (
        <Fragment>
          <Heading2 mt="1">Antennes</Heading2>
          <Card p="6" mt="3">
            <Flex alignItems="center">
              <Box
                sx={{
                  flexGrow: 1,
                  flexBasis: 120
                }}
              >
                <img src="/static/images/enterprise.svg" alt="entreprise" />
              </Box>
              <Box ml="5">
                <Heading4 mb="1">Créer des antennes pour mon service</Heading4>
                <Text lineHeight="1.5">
                  Si votre service est découpés en antennes indépendantes, eMJPM vous permet de
                  gérer des mesures et des préférences d’affectation pour chacune d’entre elles.
                </Text>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  flexBasis: 260
                }}
              >
                <LinkButton href="/services/antennes/create" ml="1">
                  Créer une antenne
                </LinkButton>
              </Box>
            </Flex>
          </Card>
        </Fragment>
      )}
      {service_antenne.length > 1 && (
        <Fragment>
          <Flex flexWrap="wrap" mb="3" alignItems="center" justifyContent="space-between">
            <Heading2 mt="1">Antennes</Heading2>
            <LinkButton href="/services/antennes/create" ml="1">
              Créer une antenne
            </LinkButton>
          </Flex>
          <Box sx={AntennesStyle} {...props}>
            {service_antenne.map(antenne => {
              antenne = { ...antenne, preferences: [] };
              return (
                <Antenne
                  sx={{ p: "3", minHeight: "300px" }}
                  key={antenne.id}
                  antenne={antenne}
                  linkText="Voir l'antenne"
                  href={parseInt(antenne.id, 10)}
                  Link={AntenneLinkButton}
                />
              );
            })}
          </Box>
        </Fragment>
      )}
    </BoxWrapper>
  );
};

export { ServiceAntennes };
