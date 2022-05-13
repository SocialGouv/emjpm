import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";

import { Box, Flex } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { AntenneLinkButton, LinkButton } from "~/containers/Commons";
import Antenne from "~/containers/Antenne";
import { Card, Heading, Text } from "~/components";
import { BoxWrapper, FlexWrapper, fourColumnStyle } from "~/components/Grid";

import { ANTENNE } from "./queries";

function ServiceAntennes(props) {
  const { isAntenneCreationHidden } = props;
  const { data, loading, error } = useQuery(ANTENNE, {
    fetchPolicy: "cache-and-network",
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { service_antenne } = data;
  return (
    <BoxWrapper>
      <Card p="5">
        <Flex mt="1" mb={3} justifyContent="space-between">
          <Heading size={2}>Antennes</Heading>
          {!isAntenneCreationHidden && (
            <Box>
              <LinkButton
                to="/services/antennes/create"
                ml="1"
                title="Créer une antenne"
                aria-label="Créer une antenne"
              >
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
}

ServiceAntennes.defaultProps = {
  isAntenneCreationHidden: false,
};

ServiceAntennes.propTypes = {
  isAntenneCreationHidden: PropTypes.bool,
};

export { ServiceAntennes };

function AntenneList({ service_antenne }) {
  return (
    <FlexWrapper flexWrap={"wrap"} p="15px" sx={{ bg: "#fefeff" }}>
      {service_antenne.map((antenne) => {
        antenne = { ...antenne, preferences: [] };
        return (
          <Box sx={fourColumnStyle}>
            <Antenne
              sx={{
                minHeight: "300px",
                p: "3",
                height: "100%",
                border: "1px solid gray",
              }}
              key={antenne.id}
              antenne={antenne}
              linkText="Voir l'antenne"
              to={parseInt(antenne.id, 10)}
              Link={AntenneLinkButton}
            />
          </Box>
        );
      })}
    </FlexWrapper>
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
        <img src="/images/enterprise.svg" alt="entreprise" />
      </Box>
      <Box ml="5">
        <Heading size={4} mb="1">
          Créer des antennes pour votre service
        </Heading>
        <Text lineHeight="1.5">
          Si votre service est découpés en antennes indépendantes, eMJPM vous
          permet de gérer des mesures et des préférences d’affectation pour
          chacune d’entre elles.
        </Text>
      </Box>
    </Flex>
  );
}
