import { Box, Flex, Text } from "rebass";

import { LinkButton } from "~/containers/Commons";
import useUser from "~/hooks/useUser";
import { Button, Heading } from "~/components";

import { content, subtitle } from "./style";
import React from "react";

function label(value) {
  return value ? value : "";
}

function MandatiareDpfiInformation({ mandataire, liste_blanche }) {
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
            {liste_blanche?.dpfi_departements.map((lbd, index) => {
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

function DpfiInformations() {
  const user = useUser();

  const { email, nom, prenom, dpfi } = user;
  const { liste_blanche } = dpfi;

  return (
    <Box id="mandataire_informations" tabIndex="0">
      <Heading size={3}>
        {prenom ? prenom : ""} {nom ? nom : ""}
      </Heading>
      <Flex p={1} mt={2} flexDirection="column">
        {liste_blanche && (
          <>
            <MandatiareDpfiInformation
              mandataire={dpfi}
              liste_blanche={liste_blanche}
            />
          </>
        )}

        <Box mb={2}>
          <Heading size={5}>Coordonnées</Heading>
          <Box flex={1 / 2}>
            <Flex my={1}>
              <Text sx={subtitle}>{"Email"}</Text>
              <Text sx={content}>{label(email)}</Text>
            </Flex>
            <Flex my={1}>
              <Text sx={subtitle}>{"Téléphone"}</Text>
              <Text sx={content}>{label(dpfi.telephone)}</Text>
            </Flex>
            <Flex my={1}>
              <Text sx={subtitle}>{"Téléphone portable"}</Text>
              <Text sx={content}>{label(dpfi.telephone_portable)}</Text>
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
            <Text sx={content}>{dpfi.location_adresse || ""}</Text>
          </Flex>
        </Box>

        <Box>
          {/* <Heading size={5} mt={2} mb="2">
            Votre activité
          </Heading> */}
          {/* {dpfi.suspend_activity && (
            <Flex my={1}>
              <Text sx={{ ...subtitle, color: "#DF1400" }}>
                {"Je ne souhaite pas de nouvelles mesures pour le moment"}
              </Text>
              <Text sx={content}>{dpfi.suspend_activity_reason}</Text>
            </Flex>
          )} */}
          {/* <Flex my={1}>
            <Text sx={subtitle}>
              {"Nombre de mesures souhaitées" +
                (dpfi.suspend_activity ? " (interrompu)" : "")}
            </Text>
            <Text sx={content}>{dpfi.dispo_max}</Text>
          </Flex> */}
          {/* <Flex my={1}>
            <Text sx={subtitle}>{"Nombre de mesures en cours"}</Text>
            <Text sx={content}>{dpfi.mesures_en_cours}</Text>
          </Flex> */}
          {/* <Flex my={1}>
            <Text sx={subtitle}>
              {"Informations à destination du magistrat"}
            </Text>
            <Text sx={content}>{label(dpfi.competences)}</Text>
          </Flex> */}
        </Box>
      </Flex>
      {/* <Flex p={1} flexDirection="column">
        <AccessToken />
      </Flex> */}
      <Flex mt="5" justifyContent="center">
        <Box>
          <Button
            variant="outline"
            as="a"
            type={null}
            href="/dpfi/edit-password"
            title="Modifier mon mot de passe"
            aria-label="Modifier mon mot de passe"
          >
            Modifier votre mot de passe
          </Button>
        </Box>
        <Box ml={1}>
          <LinkButton
            to="/dpfi/edit-informations"
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

export { DpfiInformations };
