import { useMutation, useQuery } from "@apollo/react-hooks";
import { Card } from "@emjpm/ui";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { UserContext } from "../UserContext";
import { ADD_SATISFACTION_CAMPAIGN_ANSWER } from "./mutations";
import { CURRENT_SATISFACTION_CAMPAIGN } from "./queries";
import { buttonStyle, containerStyle } from "./styles";

const SatisfactionCampaign = () => {
  const { id } = useContext(UserContext);
  const [isDone, setDone] = useState(false);
  const [isClosed, setClosed] = useState(false);

  const [addSatisfactionCampaignAnswer] = useMutation(ADD_SATISFACTION_CAMPAIGN_ANSWER);

  const { data, loading, error } = useQuery(CURRENT_SATISFACTION_CAMPAIGN, {
    variables: {
      now: new Date().toUTCString(),
      user_id: id,
    },
  });

  useEffect(() => {
    if (isDone) {
      setTimeout(() => setClosed(true), 3000);
    }
  }, [isDone]);

  if (isClosed) {
    return null;
  }

  if (error) {
    return null;
  }

  if (loading && !data) {
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

  const handleClick = async (value) => {
    await addSatisfactionCampaignAnswer({
      variables: {
        satisfaction_campaign_id: satisfactionCampaign.id,
        user_id: id,
        value,
      },
    });

    setDone(true);
  };

  return (
    <Card sx={containerStyle}>
      {isDone ? (
        <Text mt={6} fontSize={4}>
          Merci de votre participation.
        </Text>
      ) : (
        <Fragment>
          <Text fontSize={3} fontWeight="bold" mb={2}>
            Donnez-nous votre avis
          </Text>
          <Text lineHeight={1.3} fontSize={2} mb={4}>
            Etes-vous satisfait de la plateforme e-MJPM?
          </Text>
          <Flex alignItems="center">
            <Box sx={buttonStyle} onClick={() => handleClick(0)}>
              <span role="img" aria-label="Non satisfait">
                &#128577;
              </span>
            </Box>
            <Box sx={buttonStyle} onClick={() => handleClick(1)}>
              <span role="img" aria-label="Satisfait">
                &#128528;
              </span>
            </Box>
            <Box sx={buttonStyle} onClick={() => handleClick(2)}>
              <span role="img" aria-label="Très satisfait">
                &#128578;
              </span>
            </Box>
          </Flex>
        </Fragment>
      )}
    </Card>
  );
};

export { SatisfactionCampaign };
