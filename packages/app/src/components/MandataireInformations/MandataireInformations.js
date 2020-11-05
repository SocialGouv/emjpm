import { Button, Heading3, Heading5 } from "@emjpm/ui";
import Link from "next/link";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { AccessToken } from "../AccessToken";
import { LinkButton } from "../Commons";
import { UserContext } from "../UserContext";
import { content, innerTextStyle, subtitle } from "./style";

const label = (value) => {
  return value ? value : "";
};

const MandataireInformations = () => {
  const user = useContext(UserContext);
  const { email, nom, prenom, mandataire } = user;
  const { mandataire_tis } = mandataire;

  return (
    <Box>
      <Heading3>
        {prenom ? prenom : ""} {nom ? nom : ""}
      </Heading3>
      <Flex p={1} mt={2} flexDirection={["column", "column", "column"]}>
        <Box flex={1 / 2}>
          <Heading5>Structure juridique</Heading5>
          <Flex my={1}>
            <Text sx={subtitle}>{"Siret"}</Text>
            <Text sx={content}>{label(mandataire.siret)}</Text>
          </Flex>
          <Flex my={1}>
            <Text sx={subtitle}>{"Adresse"}</Text>
            <Text sx={content}>{label(mandataire.adresse)}</Text>
          </Flex>
          <Flex my={1}>
            <Text sx={subtitle}>{"Code postal"}</Text>
            <Text sx={content}>{label(mandataire.code_postal)}</Text>
          </Flex>
          <Flex my={1}>
            <Text sx={subtitle}>{"Ville"}</Text>
            <Text sx={content}>{label(mandataire.ville)}</Text>
          </Flex>
        </Box>
        <Box flex={1 / 2}>
          <Heading5>Coordonnées</Heading5>
          <Box flex={1 / 2}>
            <Flex my={1}>
              <Text sx={subtitle}>{"Email"}</Text>
              <Text sx={content}>{label(email)}</Text>
            </Flex>
            <Flex my={1}>
              <Text sx={subtitle}>{"Téléphone"}</Text>
              <Text sx={content}>{label(mandataire.telephone)}</Text>
            </Flex>
            <Flex my={1}>
              <Text sx={subtitle}>{"Téléphone portable"}</Text>
              <Text sx={content}>{label(mandataire.telephone_portable)}</Text>
            </Flex>
          </Box>
        </Box>
        <Box>
          <Heading5 mt={2} mb="2">
            Votre activité
          </Heading5>
          <Flex my={1}>
            <Text sx={subtitle}>{"Nombre de mesures souhaité"}</Text>
            <Text sx={content}>{label(mandataire.dispo_max)}</Text>
          </Flex>
          <Flex my={1}>
            <Text sx={subtitle}>
              {"Informations à destination du magistrat"}
            </Text>
            <Text sx={content}>{label(mandataire.competences)}</Text>
          </Flex>
        </Box>
      </Flex>
      <Flex p={1} flexDirection="column">
        <Heading5>Tribunaux d’instance</Heading5>
        <Box>
          {mandataire_tis.map((ti, index) => {
            return (
              <Text key={index} sx={innerTextStyle}>
                {ti.ti.etablissement}
              </Text>
            );
          })}
        </Box>
        <AccessToken />
      </Flex>
      <Flex mt="5" justifyContent="center">
        <Box>
          <Link href="/mandataires/edit-password">
            <Button variant="outline">Modifier votre mot de passe</Button>
          </Link>
        </Box>
        <Box ml={1}>
          <LinkButton href="/mandataires/edit-informations">
            Modifier vos informations
          </LinkButton>
        </Box>
      </Flex>
    </Box>
  );
};

export { MandataireInformations };
