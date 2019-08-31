import React from "react";
import { Box, Text, Flex } from "rebass";
import { Card, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";

import { LinkButton } from "../../components-v2/commons/LinkButton";

import { PreferencesPanelStyle } from "./style";

const PreferencesPanel = props => {
  return (
    <Box sx={PreferencesPanelStyle} {...props}>
      <Card p="5">
        <Heading3>
          3600<Text sx={{ color: "mediumGray", fontSize: "1" }}>mesures souhaitées</Text>
        </Heading3>
        <Heading5 mt="5">Préférences géographiques</Heading5>
        <Text mt="1" color="mediumGray" fontWeight="600">
          Ville de preférence
        </Text>
        <Flex mt="5">
          <LinkButton href="/services/edit-informations">Editer mes préférences</LinkButton>
        </Flex>
      </Card>
      <Text
        sx={{
          textAlign: "center",
          fontStyle: "italic",
          mt: "5",
          color: "textSecondary",
          fontWeight: 600,
          lineHeight: 1.6
        }}
      >
        Ces préférences sont indicatives et sont communiquées au juge lors de son choix
      </Text>
    </Box>
  );
};

export { PreferencesPanel };
