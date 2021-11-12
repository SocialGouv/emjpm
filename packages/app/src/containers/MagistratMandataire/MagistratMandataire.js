import { useQuery } from "@apollo/client";
import { Box, Flex, Text } from "rebass";

import { Link } from "~/components/Link";
import { MagistratMandataireComments } from "~/containers/MagistratMandataireComments";
import { MagistratServiceAntennes } from "~/containers/MagistratServiceAntennes";
import { Button, Heading } from "~/components";
import { formatGestionnaireId } from "~/formatters/mandataires";
import useQueryReady from "~/hooks/useQueryReady";

import { GESTIONNAIRES } from "./queries";
import {
  MagistratContentMandataireStyle,
  MagistratMandataireStyle,
  MagistratSideMandataireStyle,
  MagistratTitleMandataireStyle,
  MagistratTribunal,
} from "./style";
import { formatGestionnaire } from "./utils";

import { MagistratMandataireMap } from "~/containers/MagistratMandataireMap";

export function MagistratMandataire(props) {
  const { gestionnaireId, tiId } = props;
  const { mandataireId, serviceId } = formatGestionnaireId(gestionnaireId);
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
    suspendActivity,
    suspendActivityReason,
  } = formatedGestionnaire;

  const lastLoginColor = lastLoginIsCritical ? "error" : "";
  return (
    <Box {...props} width="100%" mb={6}>
      <Flex alignItems="center" justifyContent="space-between">
        {serviceId && <Heading size={2}>{etablissement}</Heading>}
        {mandataireId && <Heading size={2}>{`${prenom} ${nom}`}</Heading>}

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
              <Text
                sx={{
                  ...MagistratContentMandataireStyle,
                  ...(suspendActivity ? { color: "error" } : {}),
                }}
              >
                {suspendActivity ? "Activité suspendue" : currentAvailability}
                {suspendActivity && (
                  <>
                    <br />
                    {"Motif: " + (suspendActivityReason || "")}
                  </>
                )}
              </Text>
            </Box>
            <Box>
              <Text sx={MagistratTitleMandataireStyle}>
                En cours / souhaitée
              </Text>
              <Text sx={MagistratContentMandataireStyle}>
                {mesuresInProgress} /{" "}
                <Text
                  sx={{
                    ...MagistratContentMandataireStyle,
                    ...(suspendActivity ? { color: "error" } : {}),
                  }}
                  display="inline"
                >
                  {suspendActivity ? "Activité suspendue" : dispoMax}
                </Text>
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
        <MagistratMandataireMap
          longitude={longitude}
          discriminator={discriminator}
          latitude={latitude}
          id={id}
        />
      </Box>
    </Box>
  );
}

export default MagistratMandataire;
