import { Heading3, Heading4 } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { AccessToken } from "../AccessToken";
import { LinkButton } from "../Commons";
import { UserContext } from "../UserContext";
import { boxStyle, content, innerTextStyle, subtitle } from "./style";

const label = value => {
  return value ? value : "non renseigné";
};

const MandataireInformations = () => {
  const user = useContext(UserContext);

  const { email, nom, prenom, user_tis, mandataire } = user;
  return (
    <Box p="5">
      <Heading3>
        {nom ? nom : "Nom non renseigné"} {prenom ? prenom : "Prénom non renseigné"}
      </Heading3>
      <Flex>
        <Flex flexDirection="column" mr={6}>
          <Box sx={boxStyle}>
            <Heading4 mt={2} mb="2">
              Vos informations
            </Heading4>
            <Flex flexDirection="column">
              <Box mr={4}>
                <Text sx={subtitle}>{"Siret"}</Text>
                <Text sx={content}>{label(mandataire.siret)}</Text>
              </Box>
              <Box mr={4}>
                <Text sx={subtitle}>{"Email"}</Text>
                <Text sx={content}>{label(email)}</Text>
              </Box>
              <Box mr={4}>
                <Text sx={subtitle}>{"Nom"}</Text>
                <Text sx={content}>{label(nom)}</Text>
              </Box>
              <Box mr={4}>
                <Text sx={subtitle}>{"Prénom"}</Text>
                <Text sx={content}>{label(prenom)}</Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Flex ml={6} flexDirection="column">
          <Box sx={boxStyle}>
            <Heading4 mt={2} mb="2">
              Contact
            </Heading4>
            <Flex flexDirection="column">
              <Box mr={4}>
                <Text sx={subtitle}>{"Adresse"}</Text>
                <Text sx={content}>{label(mandataire.adresse)}</Text>
              </Box>
              <Box mr={4}>
                <Text sx={subtitle}>{"Téléphone"}</Text>
                <Text sx={content}>{label(mandataire.telephone)}</Text>
              </Box>
              <Box mr={4}>
                <Text sx={subtitle}>{"Téléphone portable"}</Text>
                <Text sx={content}>{label(mandataire.telephone_portable)}</Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Box sx={boxStyle}>
          <Heading4 mt={2} mb="2">
            Tribunaux d’instance
          </Heading4>
          <Box mr={4} mb="3">
            {user_tis.map((ti, index) => {
              return (
                <Text key={index} sx={innerTextStyle}>
                  {ti.ti.etablissement}
                </Text>
              );
            })}
          </Box>
        </Box>
        <Box sx={boxStyle}>
          <Heading4 mt={2} mb="2">
            Informations à destination du magistrat
          </Heading4>
          <Flex justifyContent="flex-start">
            <Box mr={4}>
              <Text sx={content}>{label(mandataire.competences)}</Text>
            </Box>
          </Flex>
        </Box>
        <AccessToken />
      </Flex>
      <Flex mt="5">
        <Box>
          <LinkButton href="/mandataires/edit-informations">Modifier vos informations</LinkButton>
        </Box>
      </Flex>
      <Flex mt="1">
        <LinkButton href="/mandataires/edit-password">Modifier votre mot de passe</LinkButton>
      </Flex>
    </Box>
  );
};

export { MandataireInformations };
