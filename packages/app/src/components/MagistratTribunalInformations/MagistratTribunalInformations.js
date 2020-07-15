import { Card, Heading3 } from "@emjpm/ui";
import { MailOutline } from "@styled-icons/material/MailOutline";
import { Smartphone } from "@styled-icons/material/Smartphone";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { UserContext } from "../UserContext";
import { boxStyle, iconTextStyle, innerTextStyle } from "./style";

const MagistratTribunalInformations = (props) => {
  const {
    magistrat: { ti },
  } = useContext(UserContext);
  return (
    <Box {...props}>
      <Card p="5">
        <Heading3>{ti.etablissement}</Heading3>
        <Box sx={boxStyle}>
          <Text sx={innerTextStyle}>
            {ti.code_postal} {ti.ville}
          </Text>
          <Text sx={innerTextStyle}>{ti.siret ? `Siret: ${ti.siret}` : ""}</Text>
          <Flex mt="3">
            <MailOutline size="16" />
            <Text sx={iconTextStyle}>{ti.email.length > 1 ? ti.email : ""}</Text>
          </Flex>
          <Flex mt="1">
            <Smartphone size="16" />
            <Text sx={iconTextStyle}>{ti.telephone.length > 1 ? ti.telephone : ""}</Text>
          </Flex>
        </Box>
      </Card>
    </Box>
  );
};

export { MagistratTribunalInformations };
