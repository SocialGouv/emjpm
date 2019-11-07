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

const MagistratInformations = props => {
  const {
    email,
    cabinet,
    nom,
    prenom,
    magistrat: { ti }
  } = props;
  return (
    <Box {...props}>
      <Card p="5">
        <Text sx={titleStyle}>
          {nom ? nom : "Nom non renseigné"} {prenom ? prenom : "Prénom non renseigné"}
        </Text>
        <Heading3>{ti.etablissement}</Heading3>
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
          <Box sx={boxStyle}>
            <Heading5>Votre tribunal</Heading5>
            <Text sx={topTextStyle}>{ti.etablissement}</Text>
            <Text sx={innerTextStyle}>
              {ti.code_postal} {ti.ville}
            </Text>
            <Text sx={innerTextStyle}>
              {ti.siret ? `Siret: ${ti.siret}` : "Numero de siret non renseigné"}
            </Text>
            <Flex mt="3">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>
                {ti.email.length > 1 ? ti.email : "Email non renseigné"}
              </Text>
            </Flex>
            <Flex mt="1">
              <Smartphone size="16" />
              <Text sx={iconTextStyle}>
                {ti.telephone.length > 1 ? ti.telephone : "Téléphone non renseigné"}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex mt="5">
          <Box mr="1">
            <LinkButton href="/magistrats/edit-informations">Modifier mes informations</LinkButton>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export { MagistratInformations };
