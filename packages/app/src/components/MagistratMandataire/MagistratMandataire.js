import { useQuery } from "@apollo/client";
import React, { lazy, Suspense } from "react";
import { Box, Flex, Text } from "rebass";

import { Link } from "~/components/Link";
import { MagistratMandataireComments } from "~/components/MagistratMandataireComments";
import { MagistratServiceAntennes } from "~/components/MagistratServiceAntennes";
import { Button, Card, Heading2, Heading4, Spinner } from "~/ui";
import { formatGestionnaireId } from "~/util/mandataires";

import { GESTIONNAIRES } from "./queries";
import {
  MagistratContentMandataireStyle,
  MagistratMandataireStyle,
  MagistratSideMandataireStyle,
  MagistratTitleMandataireStyle,
  MagistratTribunal,
} from "./style";
import { formatGestionnaire } from "./utils";

const MagistratMandataireMap = lazy(() =>
  import("~/components/MagistratMandataireMap").then(
    (mod) => mod.MagistratMandataireMap
  )
);

export const MagistratMandataire = (props) => {
  const { gestionnaireId, tiId } = props;
  const { mandataireId, serviceId } = formatGestionnaireId(gestionnaireId);
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
    currentAvailability,
    etablissement,
    mesuresAwaiting,
    mesuresInProgress,
    dispoMax,
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
      <Flex alignItems="center" justifyContent="space-between">
        {serviceId && <Heading2>{etablissement}</Heading2>}
        {mandataireId && <Heading2>{`${prenom} ${nom}`}</Heading2>}

        <Link to={`/magistrats/gestionnaires/${gestionnaireId}/reservation`}>
          <Button>Réserver une mesure</Button>
        </Link>
      </Flex>

      <Flex sx={MagistratMandataireStyle} flexDirection="column">
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
              <Text sx={MagistratTitleMandataireStyle}>Dernière connexion</Text>
              <Text color={lastLoginColor} sx={MagistratContentMandataireStyle}>
                {lastLogin}
              </Text>
            </Box>
            <Box mb={4}>
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
            <Box>
              <Text sx={MagistratTitleMandataireStyle}>
                Informations (Préférences géographiques, compétences, ...)
              </Text>
              <pre style={{ whiteSpace: "pre-wrap" }}>{competences}</pre>
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
              <Text sx={MagistratTitleMandataireStyle}>Mesure en attente</Text>
              <Text sx={MagistratContentMandataireStyle}>
                {mesuresAwaiting}
              </Text>
            </Box>
            <Box>
              <Text sx={MagistratTitleMandataireStyle}>
                Observations sur le mandataire
              </Text>
              <MagistratMandataireComments
                tiId={tiId}
                serviceId={serviceId}
                mandataireId={mandataireId}
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Box>
        {serviceId && <MagistratServiceAntennes serviceId={serviceId} />}
      </Box>
      <Box height="400px" mt="5" sx={MagistratSideMandataireStyle}>
        <Suspense fallback={<div>Loading...</div>}>
          <MagistratMandataireMap
            longitude={longitude}
            discriminator={discriminator}
            latitude={latitude}
            id={id}
          />
        </Suspense>
      </Box>
    </Box>
  );
};

export default MagistratMandataire;
