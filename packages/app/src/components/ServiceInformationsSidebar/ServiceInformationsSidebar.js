import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle";
import { BuildingHouse } from "@styled-icons/boxicons-solid/BuildingHouse";
import { Buildings } from "@styled-icons/boxicons-solid/Buildings";
import Link from "next/link";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { UserContext } from "../../../src/components/UserContext";
import {
  cardErrorStyle,
  cardStyle,
  description,
  icon,
  partTitle,
  sidebarStyle,
  title
} from "./style";

const ServiceInformationsSidebar = () => {
  const user = useContext(UserContext);
  const { service_members } = user;
  const [{ service }] = service_members;
  const {
    dispo_max,
    mesures_in_progress,
    mesures_awaiting,
    etablissement,
    latitude,
    longitude,
    service_antennes
  } = service;

  const hasInvalidGeocode = !latitude || !longitude;

  return (
    <Box sx={sidebarStyle}>
      <Flex alignItems="center" justifyContent="space-between" mb="3">
        <Box>
          <Text sx={partTitle}>Informations</Text>
        </Box>
        <Box color="mediumGray">
          <InfoCircle size="16" />
        </Box>
      </Flex>
      {hasInvalidGeocode && (
        <Flex sx={cardErrorStyle}>
          <Text mb={2} sx={partTitle}>
            Votre adresse est invalide, veuillez la renseigner dans
          </Text>
          <Link href="/services/edit">
            <a>Vos informations</a>
          </Link>
        </Flex>
      )}
      <Flex sx={cardStyle(true)} alignItems="center" mb="2">
        <Box sx={icon}>
          <BuildingHouse size="24" />
        </Box>
        <Box>
          <Text sx={title}>{etablissement}</Text>
          <Text sx={description(true)}>
            {mesures_in_progress} / {dispo_max}
          </Text>
          <Text sx={description(true)}>{mesures_awaiting} en attente</Text>
        </Box>
      </Flex>
      {service_antennes.map(antenne => (
        <Flex sx={cardStyle(false)} key={antenne.id} alignItems="center" mb="2">
          <Box sx={icon(false)}>
            <Buildings size="24" />
          </Box>
          <Box>
            <Text sx={title}>{antenne.name}</Text>
            <Text sx={description(false)}>
              {antenne.mesures_in_progress} / {antenne.mesures_max}
            </Text>
            <Text sx={description(false)}>{antenne.mesures_awaiting} en attente</Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export { ServiceInformationsSidebar };
