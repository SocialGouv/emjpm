import { useQuery } from "@apollo/react-hooks";
import { Card, Heading3 } from "@emjpm/ui";
import PropTypes from "prop-types";
import React from "react";
import { Box, Text } from "rebass";

import { GET_SERVICES_DISPONIBILITY } from "./queries";
import { PreferencesPanelStyle } from "./style";

const ServiceSidebar = props => {
  const { isDescriptionHidden } = props;
  const { data, error, loading } = useQuery(GET_SERVICES_DISPONIBILITY);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const [service] = data.services;

  return (
    <Box sx={PreferencesPanelStyle} {...props}>
      <Card p="5">
        <Heading3>
          {service.dispo_max}
          <Text sx={{ color: "mediumGray", fontSize: "1", mb: "1" }}>mesures souhaitées</Text>
        </Heading3>
        <Heading3>
          {service.mesures_in_progress}
          <Text sx={{ color: "mediumGray", fontSize: "1", mb: "1" }}>mesures en cours</Text>
        </Heading3>
        <Heading3>
          {service.mesures_awaiting}
          <Text sx={{ color: "mediumGray", fontSize: "1" }}>mesures en attente</Text>
        </Heading3>
      </Card>
      {!isDescriptionHidden && (
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
      )}
    </Box>
  );
};

ServiceSidebar.defaultProps = {
  currentAntenne: null,
  isDescriptionHidden: false
};

ServiceSidebar.propTypes = {
  currentAntenne: PropTypes.string,
  isDescriptionHidden: PropTypes.bool
};

export { ServiceSidebar };
