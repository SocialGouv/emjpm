import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";
import { MailOutline, Smartphone } from "styled-icons/material";

import { LinkButton, ServiceEditLinkButton } from "../Commons";
import { GET_SERVICES } from "./queries";
import {
  boxStyle,
  flexStyle,
  iconTextStyle,
  innerTextStyle,
  titleStyle,
  topTextStyle
} from "./style";

const ServicesInformations = props => {
  const { data, error, loading } = useQuery(GET_SERVICES, { fetchPolicy: "cache-and-network" });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  // first of the array because it should be only one
  const [service] = data.services;
  const {
    adresse,
    information,
    code_postal,
    email,
    etablissement,
    service_tis,
    telephone,
    ville
  } = service;
  return (
    <Box {...props}>
      <Card p="5">
        <Text sx={titleStyle}>Service</Text>
        <Heading3>{etablissement}</Heading3>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading5 mb="3">Contact</Heading5>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>{email || "Email non renseigné"}</Text>
            </Flex>
            <Flex mt="1">
              <Smartphone size="16" />
              <Text sx={iconTextStyle}>{telephone || "Numero de téléphone non renseigné"}</Text>
            </Flex>
            <Heading5 mt="5" mb="3">
              Informations
            </Heading5>
            <Text sx={topTextStyle}>{adresse}</Text>
            <Text sx={innerTextStyle}>{code_postal}</Text>
            <Text sx={innerTextStyle}>{ville}</Text>
          </Box>
          <Box sx={boxStyle}>
            <Heading5 mt="5" mb="3">
              Tribunaux d’instance
            </Heading5>
            {service_tis.map(ti => {
              return (
                <Text key={ti.ti.id} sx={topTextStyle}>
                  {ti.ti.etablissement}
                </Text>
              );
            })}
            <Heading5 mt="5" mb="3">
              Compétences du services
            </Heading5>
            <Text sx={topTextStyle}>{information}</Text>
          </Box>
        </Flex>
        <Flex mt="5">
          <ServiceEditLinkButton>Modifier les informations de votre service</ServiceEditLinkButton>
        </Flex>
        <Flex mt="1">
          <LinkButton href="/services/edit-password">Modifier votre mot de passe</LinkButton>
        </Flex>
      </Card>
    </Box>
  );
};

ServicesInformations.defaultProps = {
  currentAntenne: null,
  user_antennes: []
};

ServicesInformations.propTypes = {
  currentAntenne: PropTypes.string,
  user_antennes: PropTypes.array
};

export { ServicesInformations };
