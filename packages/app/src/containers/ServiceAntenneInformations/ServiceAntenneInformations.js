import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";

import { Box, Flex, Text } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { AntenneEditLinkButton } from "~/containers/Commons";
import { Card, Heading } from "~/components";

import { GET_SERVICES_ANTENNE } from "./queries";
import { content, subtitle } from "./style";
import { Helmet } from "react-helmet";

function ServiceAntenneInformations(props) {
  const { antenne_id } = props;
  const { data, error, loading } = useQuery(GET_SERVICES_ANTENNE, {
    fetchPolicy: "cache-and-network",
    variables: {
      antenneId: antenne_id,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { service_antenne } = data;
  const [antenne] = service_antenne;
  const {
    name,
    contact_email,
    contact_phone,
    mesures_max,
    adresse,
    contact_firstname,
    contact_lastname,
  } = antenne;
  return (
    <>
      <Helmet>
        <title>{name} | e-MJPM</title>
      </Helmet>
      <Box tabIndex="0">
        <Heading size={3}>{name}</Heading>
        <Card p="5">
          <Flex p={1} mt={2} flexDirection="column">
            <Box mb={2}>
              <Heading size={5} mb="3">
                Contact
              </Heading>
              <Flex my={1}>
                <Text sx={subtitle}>{"Responsable"}</Text>
                <Text sx={content}>
                  {contact_firstname || ""} {contact_lastname || ""}
                </Text>
              </Flex>
              <Flex my={1}>
                <Text sx={subtitle}>{"Email"}</Text>
                <Text sx={content}>{contact_email || ""}</Text>
              </Flex>
              <Flex my={1}>
                <Text sx={subtitle}>{"Téléphone"}</Text>
                <Text sx={content}>{contact_phone || ""}</Text>
              </Flex>
            </Box>
            <Box mb={2}>
              <Box>
                <Heading size={5}>Géolocalisation</Heading>
                <Text>
                  {
                    "Cette adresse permettra de localiser le service tutelaire sur les cartes de votre compte et des magistrats"
                  }
                </Text>
              </Box>
              <Flex my={1}>
                <Text sx={subtitle}>{"Adresse"}</Text>
                <Text sx={content}>{adresse}</Text>
              </Flex>
            </Box>
            <Box mb={2}>
              <Heading size={5}>Votre activité</Heading>
              <Flex my={1}>
                <Text sx={subtitle}>{"Nombre de mesures souhaité"}</Text>
                <Text sx={content}>{mesures_max}</Text>
              </Flex>
            </Box>
          </Flex>
          <Flex mt="5">
            <AntenneEditLinkButton antenne_id={antenne_id}>
              {"Modifier les informations de l'antenne"}
            </AntenneEditLinkButton>
          </Flex>
        </Card>
      </Box>
    </>
  );
}

ServiceAntenneInformations.defaultProps = {
  currentAntenne: null,
};

ServiceAntenneInformations.propTypes = {
  currentAntenne: PropTypes.string,
};

export { ServiceAntenneInformations };
