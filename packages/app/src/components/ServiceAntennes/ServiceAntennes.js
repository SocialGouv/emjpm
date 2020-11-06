import { useQuery } from "@apollo/react-hooks";
import {
  Antenne,
  BoxWrapper,
  Card,
  Heading2,
  Heading4,
  Spinner,
  Text,
} from "@emjpm/ui";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex } from "rebass";

import { AntenneLinkButton, LinkButton } from "../Commons";
import { ANTENNE } from "./queries";

const ServiceAntennes = (props) => {
  const { isAntenneCreationHidden } = props;
  const { data, loading, error } = useQuery(ANTENNE, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <Card p="1" minHeight="450px">
        <Box sx={{ p: "6", position: "relative" }}>
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card p="1">
        <Box sx={{ p: "6", position: "relative" }}>error</Box>
      </Card>
    );
  }

  const { service_antenne } = data;
  return (
    <BoxWrapper>
      <Card p="5">
        <Flex mt="1" mb={3} justifyContent="space-between">
          <Heading2>Antennes</Heading2>
          {!isAntenneCreationHidden && (
            <Box>
              <LinkButton href="/services/antennes/create" ml="1">
                Créer une antenne
              </LinkButton>
            </Box>
          )}
        </Flex>
        {service_antenne.length < 1 && !isAntenneCreationHidden && (
          <NoAntenne />
        )}
        {service_antenne.length > 0 && (
          <AntenneList {...props} service_antenne={service_antenne} />
        )}
      </Card>
    </BoxWrapper>
  );
};

ServiceAntennes.defaultProps = {
  isAntenneCreationHidden: false,
};

ServiceAntennes.propTypes = {
  isAntenneCreationHidden: PropTypes.bool,
};

export { ServiceAntennes };

function AntenneList({ service_antenne }) {
  return (
    <Flex p={5} sx={{ bg: "gray" }}>
      {service_antenne.map((antenne) => {
        antenne = { ...antenne, preferences: [] };
        return (
          <Antenne
            sx={{ minHeight: "300px", p: "3" }}
            key={antenne.id}
            antenne={antenne}
            linkText="Voir l'antenne"
            href={parseInt(antenne.id, 10)}
            Link={AntenneLinkButton}
          />
        );
      })}
    </Flex>
  );
}

function NoAntenne() {
  return (
    <Flex alignItems="center">
      <Box
        sx={{
          flexBasis: 120,
          flexGrow: 1,
        }}
      >
        <img src="/static/images/enterprise.svg" alt="entreprise" />
      </Box>
      <Box ml="5">
        <Heading4 mb="1">Créer des antennes pour votre service</Heading4>
        <Text lineHeight="1.5">
          Si votre service est découpés en antennes indépendantes, eMJPM vous
          permet de gérer des mesures et des préférences d’affectation pour
          chacune d’entre elles.
        </Text>
      </Box>
    </Flex>
  );
}
