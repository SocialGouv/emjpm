import { useQuery } from "@apollo/client";
import { Box, Flex, Text } from "rebass";
import { Helmet } from "react-helmet";

import { GreffierMandataireComments } from "~/containers/GreffierMandataireComments";
import { GreffierServiceAntennes } from "~/containers/GreffierServiceAntennes";
import { Button, Heading } from "~/components";
import { formatGestionnaireId } from "~/formatters/mandataires";
import useQueryReady from "~/hooks/useQueryReady";
import { TYPES } from "~/constants/types";

import { GESTIONNAIRES } from "./queries";
import {
  GreffierContentMandataireStyle,
  GreffierMandataireStyle,
  GreffierSideMandataireStyle,
  GreffierTitleMandataireStyle,
  GreffierTribunal,
} from "./style";
import { formatGestionnaire } from "./utils";

import { GreffierMandataireMap } from "~/containers/GreffierMandataireMap";

export function GreffierMandataire(props) {
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
    useLocationAdresse,
    locationAdresse,
    adresseComplement,
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
    suspendActivity,
    suspendActivityReason,
  } = formatedGestionnaire;

  const lastLoginColor = lastLoginIsCritical ? "error" : "";
  return (
    <>
      <Helmet>
        <title>
          {formatedGestionnaire?.etablissement
            ? `${formatedGestionnaire.etablissement} - Service `
            : `${formatedGestionnaire.nom} ${formatedGestionnaire.prenom} - Mandataire ${TYPES[discriminator]} `}
          | e-MJPM
        </title>
      </Helmet>
      <Box {...props} width="100%" mb={6} id="greffier_mandataire">
        <Flex alignItems="center" justifyContent="space-between">
          {serviceId && <Heading size={2}>{etablissement}</Heading>}
          {mandataireId && <Heading size={2}>{`${prenom} ${nom}`}</Heading>}

          <Button
            as="a"
            type="null"
            href={`/greffiers/gestionnaires/${gestionnaireId}/reservation`}
            title="Réserver une mesure"
            aria-label="Réserver une mesure"
            sx={{ display: "inline-block" }}
          >
            Réserver une mesure
          </Button>
        </Flex>

        <Flex sx={GreffierMandataireStyle} flexDirection="column" tabIndex="0">
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
                  {"Complément d'adresse"}
                </Text>
                <Text sx={GreffierContentMandataireStyle}>
                  {adresseComplement}
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
              <Box mb={4}>
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
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>
                  Informations (Préférences géographiques, compétences, ...)
                </Text>
                <pre style={{ whiteSpace: "pre-wrap" }}>{competences}</pre>
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
                <Text
                  sx={{
                    ...GreffierContentMandataireStyle,
                    ...(suspendActivity ? { color: "error" } : {}),
                  }}
                >
                  {suspendActivity
                    ? "Activité interrompue"
                    : currentAvailability}
                  {suspendActivity && (
                    <>
                      <br />
                      {suspendActivityReason
                        ? "Motif: " + suspendActivityReason
                        : ""}
                    </>
                  )}
                </Text>
              </Box>
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>
                  En cours / souhaitée
                </Text>
                <Text sx={GreffierContentMandataireStyle}>
                  {mesuresInProgress} /{" "}
                  <Text
                    sx={{
                      ...GreffierContentMandataireStyle,
                      ...(suspendActivity ? { color: "error" } : {}),
                    }}
                    display="inline"
                  >
                    {suspendActivity ? "Activité interrompue" : dispoMax}
                  </Text>
                </Text>
              </Box>
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>Mesure en attente</Text>
                <Text sx={GreffierContentMandataireStyle}>
                  {mesuresAwaiting}
                </Text>
              </Box>
              <Box>
                <Text sx={GreffierTitleMandataireStyle}>
                  Observations sur le mandataire
                </Text>
                <GreffierMandataireComments
                  tiId={tiId}
                  serviceId={serviceId}
                  mandataireId={mandataireId}
                />
              </Box>
            </Box>
          </Flex>
        </Flex>
        <Box>
          {serviceId && <GreffierServiceAntennes serviceId={serviceId} />}
        </Box>
        <Box height="400px" mt="5" sx={GreffierSideMandataireStyle}>
          <GreffierMandataireMap
            longitude={longitude}
            discriminator={discriminator}
            latitude={latitude}
            id={id}
          />
        </Box>
      </Box>
    </>
  );
}

export default GreffierMandataire;
