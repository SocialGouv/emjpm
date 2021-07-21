import { isIndividuel, isPrepose } from "@emjpm/biz";
import { Box, Flex, Text } from "rebass";

import { AccessToken } from "~/containers/AccessToken";
import { LinkButton } from "~/containers/Commons";
import { Link } from "~/components/Link";
import useUser from "~/hooks/useUser";
import { Button, Heading } from "~/components";

import { content, subtitle } from "./style";
import React from "react";

function label(value) {
  return value ? value : "";
}

function MandataireInformations() {
  const user = useUser();
  const { email, nom, prenom, mandataire } = user;
  const { mandataire_tis, lb_user } = mandataire;

  return (
    <Box>
      <Heading size={3}>
        {prenom ? prenom : ""} {nom ? nom : ""}
      </Heading>
      <Flex p={1} mt={2} flexDirection="column">
        {isIndividuel(user) && lb_user && (
          <IndividuelInformations lb_user={lb_user} />
        )}
        {isPrepose(user) && lb_user && (
          <PreposeInformations lb_user={lb_user} />
        )}
        <TribunauxInformations mandataireTis={mandataire_tis} />
        <Box mb={2}>
          <Heading size={5}>Coordonnées</Heading>
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
          <Box mb={2}>
            <Heading size={5}>Géolocalisation</Heading>
            <Text>
              {
                "Cette adresse permettra de vous localiser sur les cartes de votre compte et des magistrats"
              }
            </Text>
          </Box>
          <Flex my={1}>
            <Text sx={subtitle}>{"Adresse"}</Text>
            <Text sx={content}>{label(mandataire.adresse)}</Text>
          </Flex>
        </Box>

        <Box>
          <Heading size={5} mt={2} mb="2">
            Votre activité
          </Heading>
          <Flex my={1}>
            <Text sx={subtitle}>{"Nombre de mesures souhaitées"}</Text>
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
        <AccessToken />
      </Flex>
      <Flex mt="5" justifyContent="center">
        <Box>
          <Link to="/mandataires/edit-password">
            <Button variant="outline">Modifier votre mot de passe</Button>
          </Link>
        </Box>
        <Box ml={1}>
          <LinkButton to="/mandataires/edit-informations">
            Modifier vos informations
          </LinkButton>
        </Box>
      </Flex>
    </Box>
  );
}

export { MandataireInformations };

function TribunauxInformations({ mandataireTis }) {
  return (
    <Box mb={2}>
      <Heading size={5}>Tribunaux</Heading>
      <Flex my={1}>
        <Text sx={subtitle}>{"Liste des tribunaux préférentiels"}</Text>
        <Box flex={2 / 3}>
          {mandataireTis?.map((mti, index) => {
            const { ti } = mti;
            return (
              <Text key={index} sx={content}>
                {ti.etablissement}
              </Text>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}

function PreposeInformations({ lb_user }) {
  return (
    <Box mb={2}>
      <Heading size={5}>Etablissements</Heading>
      <Flex my={1}>
        <Text sx={subtitle}>{"Liste des établissements"}</Text>
        <Box flex={2 / 3}>
          {lb_user?.lb_user_etablissements?.map((lbue, index) => {
            const { etablissement } = lbue;
            return (
              <Text key={index} sx={content}>
                {etablissement.rslongue}
                {lbue.etablissement_rattachement ? " (rattachement)" : ""}
              </Text>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}

function IndividuelInformations({ lb_user }) {
  return (
    <>
      <Box mb={2}>
        <Heading size={5}>Structure juridique</Heading>
        <Flex my={1}>
          <Text sx={subtitle}>{"Siret"}</Text>
          <Text sx={content}>{label(lb_user.siret)}</Text>
        </Flex>
        <Flex my={1}>
          <Text sx={subtitle}>{"Adresse"}</Text>
          <Box flex={2 / 3}>
            <Text sx={content}>{label(lb_user.adresse1)}</Text>
            <Text sx={content}>{label(lb_user.adresse2)}</Text>
            <Text sx={content}>
              {label(lb_user.code_postal)} {label(lb_user.ville)}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box mb={2}>
        <Heading size={5}>Agrément</Heading>
        <Flex my={1}>
          <Text sx={subtitle}>{"Liste des départements"}</Text>
          <Box flex={2 / 3}>
            {lb_user?.lb_departements.map((lbd, index) => {
              return (
                <Text key={index} sx={content}>
                  {lbd.departement.id} - {lbd.departement.nom}{" "}
                  {lbd.departement_financeur ? "(financeur)" : ""}
                </Text>
              );
            })}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
