import React from "react";
import { Box, Flex, Text } from "rebass";
import { BuildingHouse, Buildings } from "styled-icons/boxicons-solid";
import { Information } from "styled-icons/remix-line";

import { CardStyle, description, icon, partTitle, SidebarStyle, title } from "./style";

const ServiceInformationsSidebar = props => {
  const { service_admins, user_antennes } = props;
  const [serviceAdmin] = service_admins;
  const { dispo_max, mesures_in_progress, mesures_awaiting, etablissement } = serviceAdmin.service;
  return (
    <Box sx={SidebarStyle} {...props}>
      <Flex alignItems="center" justifyContent="space-between" mb="3">
        <Box>
          <Text sx={partTitle}>Informations</Text>
        </Box>
        <Box color="mediumGray">
          <Information size="16" />
        </Box>
      </Flex>
      <Flex sx={CardStyle(true)} alignItems="center" mb="2">
        <Box sx={icon}>
          <BuildingHouse size="24" />
        </Box>
        <Box>
          {/* <Text sx={description(true)}>Service</Text> */}
          <Text sx={title}>{etablissement}</Text>
          {/* <Text sx={description(true)}>En cours</Text> */}
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
          <Flex sx={CardStyle(false)} key={antenne_id} alignItems="center" mb="2">
            <Box sx={icon(false)}>
              <Buildings size="24" />
            </Box>
            <Box>
              {/* <Text sx={description(false)}>Antenne</Text> */}
              <Text sx={title}>{name}</Text>
              {/* <Text sx={description(false)}>En cours</Text> */}
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
