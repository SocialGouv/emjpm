import { isIndividuel, isPrepose } from "@emjpm/biz";
import { Box, Flex, Text } from "rebass";

import { AccessToken } from "~/containers/AccessToken";
import { LinkButton } from "~/containers/Commons";
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
  const { mandataire_tis, liste_blanche } = mandataire;

  return (
    <Box id="mandataire_informations" tabIndex="0">
      <Heading size={3}>
        {prenom ? prenom : ""} {nom ? nom : ""}
      </Heading>
      <Flex p={1} mt={2} flexDirection="column">
        {isIndividuel(user) && liste_blanche && (
          <IndividuelInformations
            mandataire={mandataire}
            liste_blanche={liste_blanche}
          />
        )}
        {isPrepose(user) && liste_blanche && (
          <PreposeInformations liste_blanche={liste_blanche} />
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
            <Text sx={subtitle}>{"Adresse de localisation"}</Text>
            <Text sx={content}>{mandataire.location_adresse || ""}</Text>
          </Flex>
        </Box>

        <Box>
          <Heading size={5} mt={2} mb="2">
            Votre activité
          </Heading>
          {mandataire.suspend_activity && (
            <Flex my={1}>
              <Text sx={{ ...subtitle, color: "#FF6966" }}>
                {"Je ne souhaite pas de nouvelles mesures pour le moment"}
              </Text>
              <Text sx={content}>{mandataire.suspend_activity_reason}</Text>
            </Flex>
          )}
          <Flex my={1}>
            <Text sx={subtitle}>
              {"Nombre de mesures souhaitées" +
                (mandataire.suspend_activity ? " (interrompu)" : "")}
            </Text>
            <Text sx={content}>{mandataire.dispo_max}</Text>
          </Flex>
          <Flex my={1}>
            <Text sx={subtitle}>{"Nombre de mesures en cours"}</Text>
            <Text sx={content}>{mandataire.mesures_en_cours}</Text>
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
          <Button
            variant="outline"
            as="a"
            type={null}
            href="/mandataires/edit-password"
            title="Modifier mon mot de passe"
            aria-label="Modifier mon mot de passe"
          >
            Modifier votre mot de passe
          </Button>
        </Box>
        <Box ml={1}>
          <LinkButton
            to="/mandataires/edit-informations"
            title=" Modifier vos informations"
            aria-label="Modifier vos informations"
          >
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

function PreposeInformations({ liste_blanche }) {
  return (
    <Box mb={2}>
      <Heading size={5}>Etablissements</Heading>
      <Flex my={1}>
        <Text sx={subtitle}>{"Liste des établissements"}</Text>
        <Box flex={2 / 3}>
          {liste_blanche?.mandataire_prepose_etablissements?.map(
            (lbue, index) => {
              const { etablissement } = lbue;
              return (
                <Text key={index} sx={content}>
                  {etablissement.rslongue}
                  {lbue.etablissement_rattachement ? " (rattachement)" : ""}
                </Text>
              );
            }
          )}
        </Box>
      </Flex>
    </Box>
  );
}

function IndividuelInformations({ mandataire, liste_blanche }) {
  return (
    <>
      <Box mb={2}>
        <Heading size={5}>Structure juridique</Heading>
        <Flex my={1}>
          <Text sx={subtitle}>{"Siret"}</Text>
          <Text sx={content}>{label(mandataire.siret)}</Text>
        </Flex>
        <Flex my={1}>
          <Text sx={subtitle}>{"Adresse"}</Text>
          <Box flex={2 / 3}>
            <Text sx={content}>
              {(mandataire.use_location_adresse
                ? mandataire.location_adresse
                : mandataire.adresse) || ""}
            </Text>
            <Text sx={content}>{label(mandataire.adresse_complement)}</Text>
            <Text sx={content}>
              {label(mandataire.code_postal)} {label(mandataire.ville)}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box mb={2}>
        <Heading size={5}>Agrément</Heading>
        <Flex my={1}>
          <Text sx={subtitle}>{"Liste des départements"}</Text>
          <Box flex={2 / 3}>
            {liste_blanche?.mandataire_individuel_departements.map(
              (lbd, index) => {
                return (
                  <Text key={index} sx={content}>
                    {lbd.departement.id} - {lbd.departement.nom}{" "}
                    {lbd.departement_financeur ? "(financeur)" : ""}
                  </Text>
                );
              }
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
