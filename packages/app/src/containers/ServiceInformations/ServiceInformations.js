import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";

import { Box, Flex, Text } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { AccessToken } from "~/containers/AccessToken";
import { LinkButton } from "~/containers/Commons";
import { Button, Heading } from "~/components";
import useUser from "~/hooks/useUser";

import { GET_SERVICES } from "./queries";
import { content, subtitle } from "./style";

function ServiceInformations() {
  const { service: currentService } = useUser();
  const { data, error, loading } = useQuery(GET_SERVICES, {
    fetchPolicy: "cache-and-network",
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const service = data.services.find((ser) => ser.id === currentService.id);

  const {
    competences,
    email,
    etablissement,
    service_tis,
    telephone,
    siret,
    nom,
    prenom,
    dispo_max,
    org_gestionnaire,
    org_adresse,
    org_nom,
    org_code_postal,
    org_ville,
    adresse,
    location_adresse,
    use_location_adresse,
    code_postal,
    ville,
  } = service;

  return (
    <Box>
      <Heading size={3}>{etablissement}</Heading>
      <Flex p={1} mt={2} flexDirection="column">
        <Box mb={2}>
          <Heading size={5}>Service tutelaire</Heading>
          <Flex my={1}>
            <Text sx={subtitle}>{"Siret"}</Text>
            <Text sx={content}>{siret || ""}</Text>
          </Flex>
          <Flex my={1}>
            <Text sx={subtitle}>{"Adresse"}</Text>
            <Box flex={2 / 3}>
              <Text sx={content}>
                {(use_location_adresse ? location_adresse : adresse) || ""}
              </Text>
              <Text sx={content}>
                {code_postal || ""} {ville || ""}
              </Text>
            </Box>
          </Flex>
        </Box>
        {org_gestionnaire && (
          <Box mb={2}>
            <Heading size={5}>Organisme gestionnaire</Heading>
            <Flex my={1}>
              <Text sx={subtitle}>{"Nom"}</Text>
              <Text sx={content}>{org_nom || ""}</Text>
            </Flex>
            <Flex my={1}>
              <Text sx={subtitle}>{"Adresse"}</Text>
              <Box>
                <Text sx={content}>{org_adresse || ""}</Text>
                <Text sx={content}>
                  {org_code_postal || ""} {org_ville || ""}
                </Text>
              </Box>
            </Flex>
          </Box>
        )}

        <Box mb={2}>
          <Heading size={5} mb="3">
            Contact
          </Heading>
          <Flex my={1}>
            <Text sx={subtitle}>{"Responsable"}</Text>
            <Text sx={content}>
              {prenom || ""} {nom || ""}
            </Text>
          </Flex>
          <Flex my={1}>
            <Text sx={subtitle}>{"Email"}</Text>
            <Text sx={content}>{email || ""}</Text>
          </Flex>
          <Flex my={1}>
            <Text sx={subtitle}>{"Téléphone"}</Text>
            <Text sx={content}>{telephone || ""}</Text>
          </Flex>
        </Box>
        <Box mb={2}>
          <Box>
            <Heading size={5}>Géolocalisation</Heading>
            <Text>
              {
                "Cette adresse permettra de localiser le service tutelaire sur les cartes de votre compte et des magistrats"
              }
            </Text>
          </Box>
          <Flex my={1}>
            <Text sx={subtitle}>{"Adresse de localisation"}</Text>
            <Text sx={content}>{location_adresse}</Text>
          </Flex>
        </Box>
        <Box mb={2}>
          <Heading size={5}>Votre activité</Heading>
          {service.suspend_activity && (
            <Flex my={1}>
              <Text sx={{ ...subtitle, color: "#DF1400" }}>
                {"Je ne souhaite pas de nouvelles mesures pour le moment"}
              </Text>
              <Text sx={content}>{service.suspend_activity_reason}</Text>
            </Flex>
          )}
          <Flex my={1}>
            <Text sx={subtitle}>
              {"Nombre de mesures souhaité" +
                (service.suspend_activity ? " (interrompu)" : "")}
            </Text>
            <Text sx={content}>{dispo_max}</Text>
          </Flex>
          <Flex my={1}>
            <Text sx={subtitle}>{"Nombre de mesures en cours"}</Text>
            <Text sx={content}>{service.mesures_in_progress}</Text>
          </Flex>
          <Flex my={1}>
            <Text sx={subtitle}>
              {"Informations à destination du magistrat"}
            </Text>
            <Text sx={content}>{competences}</Text>
          </Flex>
        </Box>
        <Box mb={2}>
          <Heading size={5} mb="3">
            Tribunaux d’instance
          </Heading>
          {service_tis.map((ti) => {
            return (
              <Text key={ti.ti.id} sx={content}>
                {ti.ti.etablissement}
              </Text>
            );
          })}
          <AccessToken />
        </Box>
        <Flex mt="5" justifyContent="center">
          <Box>
            <Button
              variant="outline"
              as="a"
              href="/services/edit-password"
              title=" Modifier votre mot de passe"
              aria-label="Modifier votre mot de passe"
            >
              Modifier votre mot de passe
            </Button>
          </Box>
          <Box ml={1}>
            <LinkButton
              to="/services/edit-informations"
              aria-label="Modifier les informations"
              title="Modifier les informations"
            >
              Modifier les informations
            </LinkButton>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

ServiceInformations.defaultProps = {
  currentAntenne: null,
};

ServiceInformations.propTypes = {
  currentAntenne: PropTypes.string,
};

export { ServiceInformations };
