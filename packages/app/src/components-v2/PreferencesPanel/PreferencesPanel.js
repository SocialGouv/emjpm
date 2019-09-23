import React from "react";
import { Box, Text, Flex } from "rebass";
import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3 } from "@socialgouv/emjpm-ui-core";

import { GET_SERVICES_ANTENNE } from "./queries";
import { LinkButton } from "../Commons";

import { PreferencesPanelStyle } from "./style";

const PreferencesPanel = props => {
  const { user_antennes } = props;
  const [mainAntenne] = user_antennes;
  const { data, error, loading } = useQuery(GET_SERVICES_ANTENNE, {
    variables: {
      antenneId: mainAntenne.antenne_id
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { service_antenne } = data;
  const [antenne] = service_antenne;

  return (
    <Box sx={PreferencesPanelStyle} {...props}>
      <Card p="5">
        <Heading3>
          {antenne.mesures_max}
          <Text sx={{ color: "mediumGray", fontSize: "1" }}>mesures souhaitées</Text>
        </Heading3>
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
