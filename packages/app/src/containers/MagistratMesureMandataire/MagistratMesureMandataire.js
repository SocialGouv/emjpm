import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { MagistratServiceAntennes } from "~/containers/MagistratServiceAntennes";
import { MesureContext } from "~/containers/MesureContext";
import { Heading } from "~/components";

import { GESTIONNAIRES } from "./queries";
import {
  MagistratContentMandataireStyle,
  MagistratMainStyle,
  MagistratMandataireStyle,
  MagistratSideStyle,
  MagistratTitleMandataireStyle,
  MagistratTribunal,
} from "./style";
import { formatGestionnaire } from "./utils";

import { MagistratMandataireMap } from "~/containers/MagistratMandataireMap";

function MagistratMesureMandataire(props) {
  const { serviceId, mandataireId } = useContext(MesureContext);
  const { data, error, loading } = useQuery(GESTIONNAIRES, {
    variables: {
      mandataire_id: mandataireId,
      service_id: serviceId,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const [gestionnaire] = data.gestionnaires;
  const formatedGestionnaire = formatGestionnaire(gestionnaire);
  const {
    competences,
    dispoMax,
    currentAvailability,
    etablissement,
    mesuresAwaiting,
    mesuresInProgress,
    tis,
    adresse,
    useLocationAdresse,
    locationAdresse,
    locationCodePostal,
    locationVille,
    email,
    lastLogin,
    lastLoginIsCritical,
    nom,
    prenom,
    telephone,
    discriminator,
    latitude,
    longitude,
    id,
  } = formatedGestionnaire;

  const lastLoginColor = lastLoginIsCritical ? "error" : "";
  return (
    <Box {...props} width="100%" mb={6}>
      <Heading size={3} mt="4" mb="3">
        {`Le ${serviceId ? "service" : "mandataire"} attribué à la mesure`}
      </Heading>
      <Flex sx={MagistratMandataireStyle}>
        <Box sx={MagistratSideStyle} height="400px">
          <MagistratMandataireMap
            longitude={longitude}
            discriminator={discriminator}
            latitude={latitude}
            id={id}
          />
        </Box>
        <Flex sx={MagistratMainStyle} flexDirection="column">
          <Flex>
            <Box width="50%">
              {mandataireId && (
                <Box>
                  <Text sx={MagistratTitleMandataireStyle}>
                    Nom du mandataire
                  </Text>
                  <Text
                    sx={MagistratContentMandataireStyle}
                  >{`${prenom} ${nom}`}</Text>
                </Box>
              )}
              {serviceId && (
                <Box>
                  <Text sx={MagistratTitleMandataireStyle}>
                    {"Nom de l'association"}
                  </Text>
                  <Text sx={MagistratContentMandataireStyle}>
                    {etablissement}
                  </Text>
                </Box>
              )}
              <Box>
                <Text sx={MagistratTitleMandataireStyle}>
                  {"Adresse d’activité"}
                </Text>
                <Text sx={MagistratContentMandataireStyle}>
                  {useLocationAdresse ? locationAdresse : adresse}
                </Text>
              </Box>
              <Box>
                <Text sx={MagistratTitleMandataireStyle}>
                  Dernière connexion
                </Text>
                <Text
                  color={lastLoginColor}
                  sx={MagistratContentMandataireStyle}
                >
                  {lastLogin}
                </Text>
              </Box>
              <Box>
                <Text sx={MagistratTitleMandataireStyle}>
                  Tribunaux d’instance
                </Text>
                {tis.map((ti) => {
                  return (
                    <Text key={ti.tis.id} sx={MagistratTribunal}>
                      {ti.tis.etablissement}
                    </Text>
                  );
                })}
              </Box>
            </Box>
            <Box width="50%">
              <Box>
                <Text sx={MagistratTitleMandataireStyle}>Email</Text>
                <Text sx={MagistratContentMandataireStyle}>{email}</Text>
              </Box>
              <Box>
                <Text sx={MagistratTitleMandataireStyle}>Téléphone</Text>
                <Text sx={MagistratContentMandataireStyle}>{telephone}</Text>
              </Box>
              <Box>
                <Text sx={MagistratTitleMandataireStyle}>Disponibilité</Text>
                <Text sx={MagistratContentMandataireStyle}>
                  {currentAvailability}
                </Text>
              </Box>
              <Box>
                <Text sx={MagistratTitleMandataireStyle}>
                  En cours / Souhaitées
                </Text>
                <Text sx={MagistratContentMandataireStyle}>
                  {mesuresInProgress} / {dispoMax}
                </Text>
              </Box>
              <Box>
                <Text sx={MagistratTitleMandataireStyle}>
                  Mesure en attente
                </Text>
                <Text sx={MagistratContentMandataireStyle}>
                  {mesuresAwaiting}
                </Text>
              </Box>
            </Box>
          </Flex>
          <Box pt={2}>
            <Text sx={MagistratTitleMandataireStyle}>
              Informations (Préférences géographiques, compétences, ...)
            </Text>
            <pre style={{ whiteSpace: "pre-wrap" }}>{competences}</pre>
          </Box>
        </Flex>
      </Flex>
      <Box>
        {serviceId && <MagistratServiceAntennes serviceId={serviceId} />}
      </Box>
    </Box>
  );
}

export { MagistratMesureMandataire };
