import Link from "next/link";
import React from "react";
import { Box, Flex, Text } from "rebass";
import { InfoCircle } from "styled-icons/boxicons-regular";
import { BuildingHouse, Buildings } from "styled-icons/boxicons-solid";

import {
  cardErrorStyle,
  cardStyle,
  description,
  icon,
  partTitle,
  sidebarStyle,
  title
} from "./style";

const ServiceInformationsSidebar = props => {
  const { service_admins, user_antennes } = props;
  const [serviceAdmin] = service_admins;
  const {
    dispo_max,
    mesures_in_progress,
    mesures_awaiting,
    etablissement,
    latitude,
    longitude
  } = serviceAdmin.service;

  const hasInvalidGeocode = !latitude || !longitude;

  return (
    <Box sx={sidebarStyle} {...props}>
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
      {user_antennes.map(antenne => {
        const { antenne_id, service_antenne } = antenne;
        const { name, mesures_max, mesures_in_progress, mesures_awaiting } = service_antenne;
        return (
          <Flex sx={cardStyle(false)} key={antenne_id} alignItems="center" mb="2">
            <Box sx={icon(false)}>
              <Buildings size="24" />
            </Box>
            <Box>
              <Text sx={title}>{name}</Text>
              <Text sx={description(false)}>
                {mesures_in_progress} / {mesures_max}
              </Text>
              <Text sx={description(false)}>{mesures_awaiting} en attente</Text>
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export { ServiceInformationsSidebar };
