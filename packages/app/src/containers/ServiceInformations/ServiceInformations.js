import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";

import { Box, Flex, Text } from "rebass";

import { AccessToken } from "~/containers/AccessToken";
import { LinkButton } from "~/containers/Commons";
import { Link } from "~/containers/Link";
import { Button, Heading } from "~/components";

import { GET_SERVICES } from "./queries";
import { content, subtitle } from "./style";

function ServiceInformations() {
  const { data, error, loading } = useQuery(GET_SERVICES, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  // first of the array because it should be only one
  const [service] = data.services;
  const {
    adresse,
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
    lb_adresse,
    lb_code_postal,
    lb_ville,
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
              <Text sx={content}>{lb_adresse || ""}</Text>
              <Text sx={content}>
                {lb_code_postal || ""} {lb_ville || ""}
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
            <Text sx={subtitle}>{"Adresse"}</Text>
            <Text sx={content}>{adresse}</Text>
          </Flex>
        </Box>
        <Box mb={2}>
          <Heading size={5}>Votre activité</Heading>
          <Flex my={1}>
            <Text sx={subtitle}>{"Nombre de mesures souhaité"}</Text>
            <Text sx={content}>{dispo_max}</Text>
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
            <Link to="/services/edit-password">
              <Button variant="outline">Modifier votre mot de passe</Button>
            </Link>
          </Box>
          <Box ml={1}>
            <LinkButton to="/services/edit-informations">
              Modifier les informations du service
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
