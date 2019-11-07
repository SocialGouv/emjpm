import React from "react";
import { Box, Text, Flex } from "rebass";
import { Card, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import { MailOutline } from "styled-icons/material";

import { LinkButton } from "../Commons";
import { innerTextStyle, iconTextStyle, boxStyle, flexStyle } from "./style";

const MagistratInformations = props => {
  const { email, cabinet, nom, prenom } = props;
  return (
    <Box {...props}>
      <Card p="5">
        <Heading3>
          {" "}
          {nom ? nom : "Nom non renseigné"} {prenom ? prenom : "Prénom non renseigné"}
        </Heading3>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading5>Vos informations</Heading5>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>{email}</Text>
            </Flex>
            <Text sx={innerTextStyle}>{nom ? nom : "Nom non renseigné"} </Text>
            <Text sx={innerTextStyle}>{prenom ? prenom : "Prénom non renseigné"}</Text>
            <Text sx={innerTextStyle}>
              {cabinet ? `Cabinet: ${cabinet}` : "Cabinet non renseigné"}{" "}
            </Text>
          </Box>
        </Flex>
        <Flex mt="5">
          <Box>
            <LinkButton href="/magistrats/edit-informations">Modifier mes informations</LinkButton>
          </Box>
        </Flex>
        <Flex mt="1">
          <Box>
            <LinkButton href="/magistrats/edit-informations">Modifier mon mot de passe</LinkButton>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export { MagistratInformations };
