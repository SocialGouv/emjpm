import { InfoCircle } from "@styled-icons/boxicons-regular/InfoCircle";
import { BuildingHouse } from "@styled-icons/boxicons-solid/BuildingHouse";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { UserContext } from "../UserContext";
import { CardStyle, description, icon, partTitle, SidebarStyle, title } from "./style";

const MandataireInformationsSidebar = (props) => {
  const user = useContext(UserContext);
  const { nom, prenom, mandataire } = user;
  if (!mandataire) {
    console.log(`[MandataireInformationsSidebar] user ${JSON.stringify(user, undefined, 2)}`);
  }
  const { dispo_max, mesures_en_cours, mesures_en_attente } = mandataire;
  return (
    <Box sx={SidebarStyle} {...props}>
      <Flex alignItems="center" justifyContent="space-between" mb="3">
        <Box>
          <Text sx={partTitle}>Vos informations</Text>
        </Box>
        <Box color="mediumGray">
          <InfoCircle size="16" />
        </Box>
      </Flex>
      <Flex sx={CardStyle(true)} alignItems="center" mb="2">
        <Box sx={icon}>
          <BuildingHouse size="24" />
        </Box>
        <Box>
          <Text sx={title}>
            {nom} {prenom}
          </Text>
          <Text sx={description(true)}>
            {mesures_en_cours} / {dispo_max} mesures
          </Text>
          <Text sx={description(true)}>{mesures_en_attente} en attente</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export { MandataireInformationsSidebar };
