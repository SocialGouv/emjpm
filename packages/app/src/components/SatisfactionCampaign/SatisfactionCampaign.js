import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { UserContext } from "../UserContext";
import { ADD_SATISFACTION_CAMPAIGN_ANSWER } from "./mutations";
import { CURRENT_SATISFACTION_CAMPAIGN } from "./queries";

const containerStyle = {
  bg: "gray",
  position: "fixed",
  bottom: 0,
  right: 0,
  m: 4,
  p: 10,
  width: 270,
  textAlign: "center"
};

const buttonStyle = {
  cursor: "pointer",
  flexGrow: 1
};

const SatisfactionCampaign = () => {
  const { id } = useContext(UserContext);
  const [isDone, setDone] = useState(false);

  const [addSatisfactionCampaignAnswer] = useMutation(ADD_SATISFACTION_CAMPAIGN_ANSWER);

  const { data, loading, error } = useQuery(CURRENT_SATISFACTION_CAMPAIGN, {
    variables: {
      now: new Date().toUTCString(),
      user_id: id
    }
  });

  if (isDone) {
    return null;
  }

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

  const { answers } = satisfactionCampaign;

  if (answers.length) {
    return null;
  }

  const handleClick = async value => {
    await addSatisfactionCampaignAnswer({
      variables: {
        satisfaction_campaign_id: satisfactionCampaign.id,
        user_id: id,
        value
      }
    });

    setDone(true);
  };

  return (
    <Box sx={containerStyle}>
      <Text mb={4}>Campagne de satisfaction</Text>
      <Flex alignItems="center">
        <Box sx={buttonStyle} onClick={() => handleClick(1)}>
          1
        </Box>
        <Box sx={buttonStyle} onClick={() => handleClick(2)}>
          2
        </Box>
        <Box sx={buttonStyle} onClick={() => handleClick(3)}>
          3
        </Box>
      </Flex>
    </Box>
  );
};

export { SatisfactionCampaign };
