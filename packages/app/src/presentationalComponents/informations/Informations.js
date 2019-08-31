import React from "react";
import { Box, Text, Flex } from "rebass";
import { Card, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import { InformationsStyle } from "./style";
import { LinkButton } from "../commons/LinkButton";
import { MailOutline, Smartphone } from "styled-icons/material";

const Informations = props => {
  const { service_antenne } = props;

  const [service] = service_antenne;

  return (
    <Box sx={InformationsStyle} {...props}>
      <Card p="5">
        <Text fontSize="2" fontStyle="italic" color="mediumGray">
          Service
        </Text>
        <Heading3>{service.name}</Heading3>
        <Flex
          sx={{
            mt: 5,
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              flexGrow: 1
            }}
          >
            <Heading5>Contact</Heading5>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text ml="1" color="mediumGray" fontWeight="600">
                {service.contact_email}
              </Text>
            </Flex>
            <Flex mt="1">
              <Smartphone size="16" />
              <Text ml="1" color="mediumGray" fontWeight="600">
                {service.contact_phone}
              </Text>
            </Flex>

            <Heading5 mt="5">Informations</Heading5>
            <Text mt="2" color="mediumGray" fontWeight="600">
              {service.address_street}
            </Text>
            <Text mt="1" color="mediumGray" fontWeight="600">
              {service.address_zip_code}
            </Text>
            <Text mt="1" color="mediumGray" fontWeight="600">
              {service.address_city}
            </Text>
          </Box>
          <Box
            sx={{
              flexGrow: 1
            }}
          >
            <Heading5 mt="5">Tribunaux d’instance</Heading5>
            <Text mt="2" color="mediumGray" fontWeight="600">
              {"Tribunal d'Instance d'Arras"}
            </Text>
            <Heading5 mt="5">Langues parlées</Heading5>
            <Text mt="2" color="mediumGray" fontWeight="600">
              • Anglais
            </Text>
            <Text mt="1" color="mediumGray" fontWeight="600">
              • Arabe
            </Text>
            <Heading5 mt="5">Compétences particulières</Heading5>
            <Text mt="2" color="mediumGray" fontWeight="600">
              Troubles psychiques
            </Text>
            <Text mt="1" color="mediumGray" fontWeight="600">
              Langage des signes
            </Text>
          </Box>
        </Flex>
        <Flex mt="5">
          <LinkButton href="/services/edit-informations">Modifier mes informations</LinkButton>
        </Flex>
      </Card>
    </Box>
  );
};

export { Informations };
