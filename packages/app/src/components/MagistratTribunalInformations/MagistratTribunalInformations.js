import { Card, Heading3 } from "@emjpm/ui";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import { MailOutline, Smartphone } from "styled-icons/material";

import { UserContext } from "../UserContext";
import { boxStyle, iconTextStyle, innerTextStyle } from "./style";

const MagistratTribunalInformations = props => {
  const {
    magistrat: { ti }
  } = useContext(UserContext);
  return (
    <Box {...props}>
      <Card p="5">
        <Heading3>{ti.etablissement}</Heading3>
        <Box sx={boxStyle}>
          <Text sx={innerTextStyle}>
            {ti.code_postal} {ti.ville}
          </Text>
          <Text sx={innerTextStyle}>
            {ti.siret ? `Siret: ${ti.siret}` : "Numero de siret non renseigné"}
          </Text>
          <Flex mt="3">
            <MailOutline size="16" />
            <Text sx={iconTextStyle}>{ti.email.length > 1 ? ti.email : "Email non renseigné"}</Text>
          </Flex>
          <Flex mt="1">
            <Smartphone size="16" />
            <Text sx={iconTextStyle}>
              {ti.telephone.length > 1 ? ti.telephone : "Téléphone non renseigné"}
            </Text>
          </Flex>
        </Box>
      </Card>
    </Box>
  );
};

export { MagistratTribunalInformations };
