import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3, Heading5 } from "@emjpm/ui";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { AntenneEditLinkButton } from "../Commons";
import { GET_SERVICES_ANTENNE } from "./queries";
import { content, subtitle } from "./style";

const ServiceAntenneInformations = (props) => {
  const { antenne_id } = props;
  const { data, error, loading } = useQuery(GET_SERVICES_ANTENNE, {
    fetchPolicy: "cache-and-network",
    variables: {
      antenneId: antenne_id,
    },
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { service_antenne } = data;
  const [antenne] = service_antenne;
  const {
    name,
    contact_email,
    contact_phone,
    mesures_max,
    address,
    contact_firstname,
    contact_lastname,
  } = antenne;
  return (
    <Box>
      <Heading3>{name}</Heading3>
      <Card p="5">
        <Flex p={1} mt={2} flexDirection="column">
          <Box mb={2}>
            <Heading5 mb="3">Contact</Heading5>
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
              <Heading5>Géolocalisation</Heading5>
              <Text>
                {`Cette adresse permettra de localiser le service tutellaire sur les cartes de votre compte et des magistrats`}
              </Text>
            </Box>
            <Flex my={1}>
              <Text sx={subtitle}>{"Adresse"}</Text>
              <Text sx={content}>{address}</Text>
            </Flex>
          </Box>
          <Box mb={2}>
            <Heading5>Votre activité</Heading5>
            <Flex my={1}>
              <Text sx={subtitle}>{"Nombre de mesures souhaité"}</Text>
              <Text sx={content}>{mesures_max}</Text>
            </Flex>
          </Box>
        </Flex>
        <Flex mt="5">
          <AntenneEditLinkButton href={antenne_id}>
            {`Modifier les informations de l'antenne`}
          </AntenneEditLinkButton>
        </Flex>
      </Card>
    </Box>
  );
};

ServiceAntenneInformations.defaultProps = {
  currentAntenne: null,
};

ServiceAntenneInformations.propTypes = {
  currentAntenne: PropTypes.string,
};

export { ServiceAntenneInformations };
