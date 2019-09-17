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
  const [user] = props.userInformations.users;
  const { email, magistrat } = user;
  return (
    <Box {...props}>
      <Card p="5">
        <Text sx={titleStyle}>Tribunal</Text>
        <Heading3>{magistrat.ti.etablissement}</Heading3>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading5>Contact</Heading5>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>{email}</Text>
            </Flex>
            <Flex mt="1">
              <Smartphone size="16" />
              <Text sx={iconTextStyle}>{magistrat.ti.telephone}</Text>
            </Flex>
          </Box>
          <Box sx={boxStyle}>
            <Heading5>Informations</Heading5>
            <Text sx={topTextStyle}>
              {magistrat.user.nom} {magistrat.user.prenom}
            </Text>
            <Text sx={innerTextStyle}>
              {magistrat.ti.code_postal} {magistrat.ti.ville}
            </Text>
          </Box>
        </Flex>
        <Flex mt="5">
          <LinkButton href="/magistrats/edit-informations">Modifier mes informations</LinkButton>
        </Flex>
      </Card>
    </Box>
  );
};

export { Informations };
