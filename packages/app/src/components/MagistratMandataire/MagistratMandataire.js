import { useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import dynamic from "next/dynamic";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { MagistratServiceAntennes } from "../MagistratServiceAntennes";
import { GESTIONNAIRES } from "./queries";
import {
  MagistratContentMandataireStyle,
  MagistratMandataireStyle,
  MagistratSideMandataireStyle,
  MagistratTitleMandataireStyle,
  MagistratTribunal
} from "./style";
import { formatGestionnaire } from "./utils";

const MagistratMandataireMap = dynamic(
  () => import("../MagistratMandataireMap").then(mod => mod.MagistratMandataireMap),
  { ssr: false }
);

const MagistratMandataire = props => {
  const { serviceId, mandataireId } = props;
  const { data, error, loading } = useQuery(GESTIONNAIRES, {
    variables: {
      mandataire_id: mandataireId,
      service_id: serviceId
    }
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
    id
  } = formatedGestionnaire;

  const lastLoginColor = lastLoginIsCritical ? "error" : "";
  return (
    <Box {...props} width="100%" mb={6}>
      <Flex sx={MagistratMandataireStyle} flexDirection="column">
        <Flex>
          <Box width="50%">
            {mandataireId && (
              <Box>
                <Text sx={MagistratTitleMandataireStyle}>Nom du mandataire</Text>
                <Text sx={MagistratContentMandataireStyle}>{`${prenom} ${nom}`}</Text>
              </Box>
            )}
            {serviceId && (
              <Box>
                <Text sx={MagistratTitleMandataireStyle}>{`Nom de l'association`}</Text>
                <Text sx={MagistratContentMandataireStyle}>{etablissement}</Text>
              </Box>
            )}
            <Box>
              <Text sx={MagistratTitleMandataireStyle}>{`Adresse d’activité`}</Text>
              <Text
                sx={MagistratContentMandataireStyle}
              >{`${adresse} ${codePostal} ${ville}`}</Text>
            </Box>
            <Box>
              <Text sx={MagistratTitleMandataireStyle}>Dernière connexion</Text>
              <Text color={lastLoginColor} sx={MagistratContentMandataireStyle}>
                {lastLogin}
              </Text>
            </Box>
            <Box>
              <Text sx={MagistratTitleMandataireStyle}>Tribunaux d’instance</Text>
              {tis.map(ti => {
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
              <Text sx={MagistratContentMandataireStyle}>{dispoMax}</Text>
            </Box>
            <Box>
              <Text sx={MagistratTitleMandataireStyle}>Mesure en attente</Text>
              <Text sx={MagistratContentMandataireStyle}>{mesuresAwaiting}</Text>
            </Box>
            <Box>
              <Text sx={MagistratTitleMandataireStyle}>Mesure en cours</Text>
              <Text sx={MagistratContentMandataireStyle}>{mesuresInProgress}</Text>
            </Box>
          </Box>
        </Flex>
        <Box>
          <Text sx={MagistratTitleMandataireStyle}>
            Informations (Préférences géographiques, compétences, ...)
          </Text>
          <pre style={{ "white-space": "pre-wrap" }}>{competences}</pre>
        </Box>
      </Flex>

      <Box height="400px" mt="5" sx={MagistratSideMandataireStyle}>
        <MagistratMandataireMap
          longitude={longitude}
          discriminator={discriminator}
          latitude={latitude}
          id={id}
        />
      </Box>
      <Box>{serviceId && <MagistratServiceAntennes serviceId={serviceId} />}</Box>
    </Box>
  );
};

export { MagistratMandataire };
