import { Card, Heading3, Heading5 } from "@emjpm/ui";
import { MailOutline } from "@styled-icons/material/MailOutline";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { LinkButton } from "../Commons";
import { UserContext } from "../UserContext";
import { boxStyle, flexStyle, iconTextStyle, innerTextStyle } from "./style";

const DirectionInformations = (props) => {
  const { email, nom, prenom } = useContext(UserContext);
  return (
    <Box {...props}>
      <Card p="5">
        <Heading3>
          {nom ? nom : ""} {prenom ? prenom : ""}
        </Heading3>
        <Flex sx={flexStyle}>
          <Box sx={boxStyle}>
            <Heading5>Vos informations</Heading5>
            <Flex mt="2">
              <MailOutline size="16" />
              <Text sx={iconTextStyle}>{email}</Text>
            </Flex>
            <Text sx={innerTextStyle}>{nom ? nom : ""} </Text>
            <Text sx={innerTextStyle}>{prenom ? prenom : ""}</Text>
          </Box>
        </Flex>
        <Flex mt="5">
          <Box>
            <LinkButton href="/direction/edit-informations">Modifier vos informations</LinkButton>
          </Box>
        </Flex>
        <Flex mt="1">
          <LinkButton href="/direction/edit-password">Modifier votre mot de passe</LinkButton>
        </Flex>
      </Card>
    </Box>
  );
};

export { DirectionInformations };
