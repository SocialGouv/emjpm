import { useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { MesureContext } from "../MesureContext";
import { MagistratMesureMandataireAntennes } from "./MagistratMesureMandataireAntennes";
import { MagistratMesureMandataireComments } from "./MagistratMesureMandataireComments";
import { GESTIONNAIRES } from "./queries";
import {
  MagistratCommentsStyle,
  MagistratMesureContentMandataireStyle,
  MagistratMesureMainMandataireStyle,
  MagistratMesureMandataireStyle,
  MagistratMesureSideMandataireStyle,
  MagistratMesureTitleMandataireStyle
} from "./style";
import { formatGestionnaire } from "./utils";

const MagistratMesureMap = dynamic(
  () => import("../MagistratMesureMap").then(mod => mod.MagistratMesureMap),
  { ssr: false }
);

const MagistratMesureMandataire = props => {
  const { serviceId, mandataireId, tiId } = useContext(MesureContext);
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
    dispoMax,
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
    latitude,
    longitude,
    ville,
    id
  } = formatedGestionnaire;

  const lastLoginColor = lastLoginIsCritical ? "error" : "";
  return (
    <Box {...props} width="100%">
      <Flex sx={MagistratMesureMandataireStyle}>
        <Box sx={MagistratMesureSideMandataireStyle}>
          <MagistratMesureMap longitude={longitude} latitude={latitude} id={id} />
        </Box>
        <Flex sx={MagistratMesureMainMandataireStyle}>
          <Box width="50%">
            <Box>
              <Text sx={MagistratMesureTitleMandataireStyle}>Nom du mandataire</Text>
              <Text sx={MagistratMesureContentMandataireStyle}>{`${prenom} ${nom}`}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleMandataireStyle}>Adresse d’activité</Text>
              <Text
                sx={MagistratMesureContentMandataireStyle}
              >{`${adresse} ${codePostal} ${ville}`}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleMandataireStyle}>Dernière connexion</Text>
              <Text color={lastLoginColor} sx={MagistratMesureContentMandataireStyle}>
                {lastLogin}
              </Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleMandataireStyle}>Tribunaux d’instance</Text>
              {tis.map(ti => {
                return (
                  <Text key={ti.tis.id} sx={MagistratMesureContentMandataireStyle}>
                    {ti.tis.etablissement}
                  </Text>
                );
              })}
            </Box>
          </Box>
          <Box width="50%">
            <Box>
              <Text sx={MagistratMesureTitleMandataireStyle}>Email</Text>
              <Text sx={MagistratMesureContentMandataireStyle}>{email}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleMandataireStyle}>Téléphone</Text>
              <Text sx={MagistratMesureContentMandataireStyle}>{telephone}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleMandataireStyle}>Disponibilité</Text>
              <Text sx={MagistratMesureContentMandataireStyle}>{dispoMax}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleMandataireStyle}>Mesure en attente</Text>
              <Text sx={MagistratMesureContentMandataireStyle}>{mesuresAwaiting}</Text>
            </Box>
            <Box>
              <Text sx={MagistratMesureTitleMandataireStyle}>Mesure en cours</Text>
              <Text sx={MagistratMesureContentMandataireStyle}>{mesuresInProgress}</Text>
            </Box>
          </Box>
        </Flex>
      </Flex>

      <Flex width="100%">
        <Box sx={MagistratCommentsStyle}>
          <MagistratMesureMandataireComments
            tiId={tiId}
            serviceId={serviceId}
            mandataireId={mandataireId}
          />
        </Box>
        {serviceId && <MagistratMesureMandataireAntennes serviceId={serviceId} />}
      </Flex>
    </Box>
  );
};

export { MagistratMesureMandataire };
