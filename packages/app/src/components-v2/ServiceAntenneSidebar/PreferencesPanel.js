import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3 } from "@socialgouv/emjpm-ui-core";
import PropTypes from "prop-types";
import React from "react";
import { Box, Text } from "rebass";

import { GET_SERVICES_ANTENNE } from "./queries";
import { PreferencesPanelStyle } from "./style";

const PreferencesPanel = props => {
  const { user_antennes, currentAntenne } = props;
  const [mainAntenne] = user_antennes;
  const { data, error, loading } = useQuery(GET_SERVICES_ANTENNE, {
    variables: {
      antenneId: currentAntenne ? currentAntenne : mainAntenne.antenne_id
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
        Ces préférences sont indicatives et sont communiquées au juge lors de son choix
      </Text>
    </Box>
  );
};

PreferencesPanel.defaultProps = {
  currentAntenne: null,
  user_antennes: []
};

PreferencesPanel.propTypes = {
  currentAntenne: PropTypes.string,
  user_antennes: PropTypes.array
};

export { PreferencesPanel };
