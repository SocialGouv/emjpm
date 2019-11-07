import React, { useState } from "react";
import { Box, Text, Flex } from "rebass";
import { Card, Button, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import { MailOutline } from "styled-icons/material";

import { LinkButton } from "../Commons";
import { innerTextStyle, iconTextStyle, boxStyle, flexStyle } from "./style";
import { doForgotPassword } from "../../components/loginComponents/ForgotPasswordForm";

const MagistratInformations = props => {
  const [isOpen, toggleModal] = useState(false);
  const { email, cabinet, nom, prenom } = props;
  const changePassword = email => {
    doForgotPassword({ email: email }).then(() => {
      toggleModal(true);
    });
  };

  return (
    <Box {...props}>
      <Card p="5">
        <Heading3>
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
          {isOpen ? (
            <Box>
              <Card backgroundColor="success" color="white">
                Un mail vient de vous être envoyer pour réinitialiser votre mot de passe
              </Card>
            </Box>
          ) : (
            <Box>
              <Button onClick={() => changePassword(email)}>Réinitialiser mon mot de passe</Button>
            </Box>
          )}
        </Flex>
      </Card>
    </Box>
  );
};

export { MagistratInformations };
