import { Card, Heading3, Heading4 } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { LinkButton } from "../Commons";
import { UserContext } from "../UserContext";
import { boxStyle, content, innerTextStyle, subtitle } from "./style";

const label = value => {
  return value ? value : "non renseigné";
};

const MandataireInformations = props => {
  const user = useContext(UserContext);

  const { email, nom, prenom, user_tis, mandataire } = user;
  return (
    <Box {...props}>
      <Card p="5">
        <Heading3>
          {nom ? nom : "Nom non renseigné"} {prenom ? prenom : "Prénom non renseigné"}
        </Heading3>
        <Flex>
          <Flex flexDirection="column">
            <Box sx={boxStyle}>
              <Heading4 mt={2} mb="3">
                Vos informations
              </Heading4>
              <Flex justifyContent="flex-start">
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
            <Box sx={boxStyle}>
              <Heading4 mt={2} mb="3">
                Activité
              </Heading4>
              <Flex justifyContent="flex-start">
                <Box mr={4}>
                  <Text sx={subtitle}>{"SIRET"}</Text>
                  <Text sx={content}>{label(mandataire.siret)}</Text>
                </Box>
                <Box mr={4}>
                  <Text sx={subtitle}>{"Sécrétariat spécialisé"}</Text>
                  <Text sx={content}>{mandataire.secretariat ? "oui" : "non"}</Text>
                </Box>
                <Box mr={4}>
                  <Text sx={subtitle}>{"ETP dédié"}</Text>
                  <Text sx={content}>{label(mandataire.nb_secretariat)}</Text>
                </Box>
                <Box mr={4}>
                  <Text sx={subtitle}>{"Compétences"}</Text>
                  <Text sx={content}>{label(mandataire.competences)}</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Flex ml={4} flexDirection="column">
            <Box sx={boxStyle}>
              <Heading4 mt={2} mb="3">
                Contact
              </Heading4>
              <Flex justifyContent="flex-start">
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
            <Box sx={boxStyle}>
              <Heading4 mt={2} mb="3">
                Tribunaux d’instance
              </Heading4>
              <Box mr={4}>
                {user_tis.map((ti, index) => {
                  return (
                    <Text key={index} sx={innerTextStyle}>
                      {ti.ti.etablissement}
                    </Text>
                  );
                })}
              </Box>
            </Box>
          </Flex>
        </Flex>
        <Flex mt="5">
          <Box>
            <LinkButton href="/mandataires/edit-informations">Modifier vos informations</LinkButton>
          </Box>
        </Flex>
        <Flex mt="1">
          <LinkButton href="/mandataires/edit-password">Modifier votre mot de passe</LinkButton>
        </Flex>
      </Card>
    </Box>
  );
};

export { MandataireInformations };
