import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3, Heading4, Spinner } from "@emjpm/ui";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { MagistratServiceAntennes } from "../MagistratServiceAntennes";
import { MesureContext } from "../MesureContext";
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

const MagistratMandataireMap = dynamic(
  () =>
    import("../MagistratMandataireMap").then(
      (mod) => mod.MagistratMandataireMap
    ),
  { ssr: false }
);

const MagistratMesureMandataire = (props) => {
  const { serviceId, mandataireId } = useContext(MesureContext);
  const { data, error, loading } = useQuery(GESTIONNAIRES, {
    variables: {
      mandataire_id: mandataireId,
      service_id: serviceId,
    },
  });

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
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
    codePostal,
    email,
    lastLogin,
    lastLoginIsCritical,
    nom,
    prenom,
    telephone,
    discriminator,
    latitude,
    longitude,
    ville,
    id,
  } = formatedGestionnaire;

  const lastLoginColor = lastLoginIsCritical ? "error" : "";
  return (
    <Box {...props} width="100%" mb={6}>
      <Heading3 mt="4" mb="3">
        {`Le ${serviceId ? "service" : "mandataire"} attribué à la mesure`}
      </Heading3>
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
                  <Text
                    sx={MagistratTitleMandataireStyle}
                  >{`Nom de l'association`}</Text>
                  <Text sx={MagistratContentMandataireStyle}>
                    {etablissement}
                  </Text>
                </Box>
              )}
              <Box>
                <Text
                  sx={MagistratTitleMandataireStyle}
                >{`Adresse d’activité`}</Text>
                <Text
                  sx={MagistratContentMandataireStyle}
                >{`${adresse} ${codePostal} ${ville}`}</Text>
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
                  En cours / souhaitée
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
};

export { MagistratMesureMandataire };
