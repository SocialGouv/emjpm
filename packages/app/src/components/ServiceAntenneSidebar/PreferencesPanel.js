import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3 } from "@emjpm/ui";
import PropTypes from "prop-types";
import React from "react";
import { Box, Text } from "rebass";

import { GET_SERVICES_ANTENNE } from "./queries";
import { PreferencesPanelStyle } from "./style";

const PreferencesPanel = props => {
  const { antenneId } = props;

  const { data, error, loading } = useQuery(GET_SERVICES_ANTENNE, {
    variables: {
      antenneId
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
    <Box sx={PreferencesPanelStyle}>
      <Card p="5">
        <Heading3>
          {antenne.mesures_max}
          <Text sx={{ color: "mediumGray", fontSize: "1", mb: "1" }}>mesures souhaitées</Text>
        </Heading3>
        <Heading3>
          {antenne.mesures_in_progress}
          <Text sx={{ color: "mediumGray", fontSize: "1", mb: "1" }}>mesures en cours</Text>
        </Heading3>
        <Heading3>
          {antenne.mesures_awaiting}
          <Text sx={{ color: "mediumGray", fontSize: "1" }}>mesures en attente</Text>
        </Heading3>
      </Card>
      <Text
        sx={{
          color: "textSecondary",
          fontStyle: "italic",
          fontWeight: 600,
          lineHeight: 1.6,
          mt: "5",
          textAlign: "center"
        }}
      >
        Ces informations sont indicatives et sont communiquées au juge des tutelles
      </Text>
    </Box>
  );
};

PreferencesPanel.propTypes = {
  antenneId: PropTypes.array.required
};

export { PreferencesPanel };
