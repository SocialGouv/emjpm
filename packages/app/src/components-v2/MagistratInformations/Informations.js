import React from "react";
import { Box, Text, Flex } from "rebass";
import { Card, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import { MailOutline, Smartphone } from "styled-icons/material";

import { LinkButton } from "../Commons";
import {
  titleStyle,
  innerTextStyle,
  topTextStyle,
  iconTextStyle,
  boxStyle,
  flexStyle
} from "./style";

const Informations = props => {
  console.log(props);
  return (
    <Box>
      <Card p="5">
        <Text sx={titleStyle}>Service</Text>
        <Heading3>{"service.name"}</Heading3>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading5>Contact</Heading5>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>{"service.contact_email"}</Text>
            </Flex>
            <Flex mt="1">
              <Smartphone size="16" />
              <Text sx={iconTextStyle}>{"service.contact_phone"}</Text>
            </Flex>
            <Heading5 mt="5">Informations</Heading5>
            <Text sx={topTextStyle}>{"service.address_street"}</Text>
            <Text sx={innerTextStyle}>{"service.address_zip_code"}</Text>
            <Text sx={innerTextStyle}>{"service.address_city"}</Text>
          </Box>
          <Box sx={boxStyle}>
            <Heading5 mt="5">Tribunaux d’instance</Heading5>
            <Text sx={topTextStyle}>{"Tribunal d'Instance d'Arras"}</Text>
            <Heading5 mt="5">Langues parlées</Heading5>
            <Text sx={topTextStyle}>• Anglais</Text>
            <Text sx={innerTextStyle}>• Arabe</Text>
            <Heading5 mt="5">Compétences particulières</Heading5>
            <Text sx={topTextStyle}>Troubles psychiques</Text>
            <Text sx={innerTextStyle}>Langage des signes</Text>
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
