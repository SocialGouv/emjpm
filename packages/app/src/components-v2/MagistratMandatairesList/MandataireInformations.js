import React from "react";
import { Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import { Box, Flex, Text } from "rebass";
import { MailOutline, Smartphone } from "styled-icons/material";
import { topTextStyle, iconTextStyle, boxStyle, flexStyle } from "./style";

const MandataireInformations = props => {
  const { nom, prenom, telephone, email, ville, tis, adresse, codePostal } = props;
  return (
    <div>
      <Heading3>{`${nom} ${prenom}`}</Heading3>
      <Flex sx={flexStyle}>
        <Box sx={boxStyle}>
          <Heading5>Contact</Heading5>
          <Flex mt="2">
            <MailOutline size="16" />
            <Text sx={iconTextStyle}>{email}</Text>
          </Flex>
          <Flex mt="1">
            <Smartphone size="16" />
            <Text sx={iconTextStyle}>{telephone}</Text>
          </Flex>
          <Heading5 mt="5">Adresse d’activité</Heading5>
          <Text sx={topTextStyle}>
            {adresse} {codePostal} {ville}
          </Text>
        </Box>
        <Box sx={boxStyle}>
          <Heading5 mt="5">Tribunaux d’instance</Heading5>
          {tis.map(ti => {
            return (
              <Text key={ti.tis.id} sx={topTextStyle}>
                - {ti.tis.etablissement}
              </Text>
            );
          })}
        </Box>
      </Flex>
    </div>
  );
};

export { MandataireInformations };
