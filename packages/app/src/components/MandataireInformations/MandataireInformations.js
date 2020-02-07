import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3, Heading4 } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import { XCircle } from "styled-icons/boxicons-regular";

import { LinkButton } from "../Commons";
import { UserContext } from "../UserContext";
import { USER_TOKEN } from "./queries";
import { boxStyle, content, innerTextStyle, subtitle } from "./style";

const label = value => {
  return value ? value : "non renseigné";
};

const MandataireInformations = props => {
  const user = useContext(UserContext);

  const { data, loading, error } = useQuery(USER_TOKEN);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { access_tokens } = data;

  const { email, nom, prenom, user_tis, mandataire } = user;
  return (
    <Box {...props}>
      <Card p="5">
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
              <Heading4 mt={2} mb="2">
                Activité
              </Heading4>
              <Flex flexDirection="column">
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
                Informations pour le magistrat
              </Heading4>
              <Flex justifyContent="flex-start">
                <Box mr={4}>
                  <Text sx={content}>{label(mandataire.competences)}</Text>
                </Box>
              </Flex>
            </Box>

            <Box sx={boxStyle}>
              <Heading4 mt={2} mb="2">
                Logitiels métier authorisé
              </Heading4>
              <Box mr={4} mb="3">
                {access_tokens.map((token, index) => {
                  return (
                    <Flex alignItem="center" key={index}>
                      <Box>
                        <Text sx={innerTextStyle}>{token.editors.name}</Text>
                      </Box>
                      <Box
                        sx={{ cursor: "pointer", width: "16px" }}
                        onClick={() => {
                          console.log("remove token");
                        }}
                      >
                        <XCircle size="16" />
                      </Box>
                    </Flex>
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
