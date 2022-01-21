import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { GreffierServiceAntennes } from "~/containers/GreffierServiceAntennes";
import { MesureContext } from "~/containers/MesureContext";
import { Heading } from "~/components";

import { GESTIONNAIRES } from "./queries";
import {
  GreffierContentMandataireStyle,
  GreffierMainStyle,
  GreffierMandataireStyle,
  GreffierSideStyle,
  GreffierTitleMandataireStyle,
  GreffierTribunal,
} from "./style";
import { formatGestionnaire } from "./utils";

import { GreffierMandataireMap } from "~/containers/GreffierMandataireMap";

function GreffierMesureMandataire(props) {
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
    codePostal,
    ville,
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
      <Flex sx={GreffierMandataireStyle}>
        <Box sx={GreffierSideStyle} height="400px">
          <GreffierMandataireMap
            longitude={longitude}
            discriminator={discriminator}
            latitude={latitude}
            id={id}
          />
        </Box>
        <Flex sx={GreffierMainStyle} flexDirection="column">
          <Flex>
            <Box width="50%">
              {mandataireId && (
                <Box>
                  <Text sx={GreffierTitleMandataireStyle}>
                    Nom du mandataire
                  </Text>
                  <Text
                    sx={GreffierContentMandataireStyle}
                  >{`${prenom} ${nom}`}</Text>
                </Box>
              )}
              {serviceId && (
                <Box>
                  <Text sx={GreffierTitleMandataireStyle}>
                    {"Nom de l'association"}
                  </Text>
                  <Text sx={GreffierContentMandataireStyle}>
                    {etablissement}
                  </Text>
                </Box>
              )}
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>
                  {"Adresse d’activité"}
                </Text>
                <Text sx={GreffierContentMandataireStyle}>
                  {useLocationAdresse ? locationAdresse : adresse}
                </Text>
              </Box>
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>
                  Dernière connexion
                </Text>
                <Text
                  color={lastLoginColor}
                  sx={GreffierContentMandataireStyle}
                >
                  {lastLogin}
                </Text>
              </Box>
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>
                  Tribunaux d’instance
                </Text>
                {tis.map((ti) => {
                  return (
                    <Text key={ti.tis.id} sx={GreffierTribunal}>
                      {ti.tis.etablissement}
                    </Text>
                  );
                })}
              </Box>
            </Box>
            <Box width="50%">
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>Email</Text>
                <Text sx={GreffierContentMandataireStyle}>{email}</Text>
              </Box>
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>Téléphone</Text>
                <Text sx={GreffierContentMandataireStyle}>{telephone}</Text>
              </Box>
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>Disponibilité</Text>
                <Text sx={GreffierContentMandataireStyle}>
                  {currentAvailability}
                </Text>
              </Box>
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>
                  En cours / Souhaitées
                </Text>
                <Text sx={GreffierContentMandataireStyle}>
                  {mesuresInProgress} / {dispoMax}
                </Text>
              </Box>
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>Mesure en attente</Text>
                <Text sx={GreffierContentMandataireStyle}>
                  {mesuresAwaiting}
                </Text>
              </Box>
            </Box>
          </Flex>
          <Box pt={2}>
            <Text sx={GreffierTitleMandataireStyle}>
              Informations (Préférences géographiques, compétences, ...)
            </Text>
            <pre style={{ whiteSpace: "pre-wrap" }}>{competences}</pre>
          </Box>
        </Flex>
      </Flex>
      <Box>
        {serviceId && <GreffierServiceAntennes serviceId={serviceId} />}
      </Box>
    </Box>
  );
}

export { GreffierMesureMandataire };
