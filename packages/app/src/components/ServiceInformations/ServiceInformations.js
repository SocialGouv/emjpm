import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3, Heading5 } from "@emjpm/ui";
import { MailOutline } from "@styled-icons/material/MailOutline";
import { MyLocation } from "@styled-icons/material/MyLocation";
import { Smartphone } from "@styled-icons/material/Smartphone";
import { Building } from "@styled-icons/boxicons-regular/Building";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { AccessToken } from "../AccessToken";
import { LinkButton, ServiceEditLinkButton } from "../Commons";
import { GET_SERVICES } from "./queries";
import { boxStyle, flexStyle, iconTextStyle, innerTextStyle, topTextStyle } from "./style";

const ServiceInformations = (props) => {
  const { data, error, loading } = useQuery(GET_SERVICES, { fetchPolicy: "cache-and-network" });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  // first of the array because it should be only one
  const [service] = data.services;
  const { adresse, competences, email, etablissement, service_tis, telephone, siret } = service;
  return (
    <Box {...props}>
      <Card p="5">
        <Heading3>{etablissement}</Heading3>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading5 mb="3">SIRET</Heading5>
            <Flex mt="2">
              <Building size="16" />
              <Text sx={iconTextStyle}>{siret || ""}</Text>
            </Flex>
          </Box>
        </Flex>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading5 mb="3">Contact</Heading5>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>{email || ""}</Text>
            </Flex>
            <Flex mt="2">
              <MyLocation size="16" />
              <Text sx={iconTextStyle}>{adresse}</Text>
            </Flex>
            <Flex mt="2">
              <Smartphone size="16" />
              <Text sx={iconTextStyle}>{telephone || ""}</Text>
            </Flex>
          </Box>
          <Box sx={boxStyle}>
            <Heading5 mb="3">Tribunaux d’instance</Heading5>
            {service_tis.map((ti) => {
              return (
                <Text key={ti.ti.id} sx={topTextStyle}>
                  {ti.ti.etablissement}
                </Text>
              );
            })}
            <AccessToken />
          </Box>
        </Flex>
        {competences && (
          <Box sx={boxStyle}>
            <Heading5 mt={2} mb="3">
              Informations à destination du magistrat
            </Heading5>
            <Flex justifyContent="flex-start">
              <Box mr={4}>
                <Text sx={innerTextStyle}>{competences}</Text>
              </Box>
            </Flex>
          </Box>
        )}
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

ServiceInformations.defaultProps = {
  currentAntenne: null,
};

ServiceInformations.propTypes = {
  currentAntenne: PropTypes.string,
};

export { ServiceInformations };
