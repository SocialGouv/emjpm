import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box } from "rebass";

import { CURRENT_SATISFACTION_CAMPAIGN } from "./queries";

const SatisfactionCampaign = () => {
  const { data, loading, error } = useQuery(CURRENT_SATISFACTION_CAMPAIGN, {
    variables: { now: new Date().toUTCString() }
  });

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  const [satisfactionCampaign] = data.satisfaction_campaigns;

  if (!satisfactionCampaign) {
    return null;
  }

  return (
    <Box
      sx={{
        bg: "orange",
        position: "absolute",
        bottom: 0,
        right: 0,
        m: 4,
        p: 4
      }}
    >
      Campagne de satisfaction
      {satisfactionCampaign.name}
    </Box>
  );
};

export { SatisfactionCampaign };
