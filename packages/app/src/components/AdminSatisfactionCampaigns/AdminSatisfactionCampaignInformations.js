import { useQuery } from "@apollo/react-hooks";
import { Text } from "@emjpm/ui";
import { format } from "date-fns";
import React from "react";
import { Box, Flex } from "rebass";

import { SATISFACTION_CAMPAIGN } from "./queries";

const AdminSatisfactionCampaignInformations = (props) => {
  const { id } = props;
  const { data, loading, error } = useQuery(SATISFACTION_CAMPAIGN, { variables: { id } });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const [satisfactionCampaign] = data.satisfaction_campaigns;

  return (
    <Box>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          ID
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{satisfactionCampaign.id}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Nom
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{satisfactionCampaign.name}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Date de début
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{format(new Date(satisfactionCampaign.started_at), "dd/MM/yyyy")}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Date de fin
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{format(new Date(satisfactionCampaign.ended_at), "dd/MM/yyyy")}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Nombre de réponses
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{satisfactionCampaign.answers.aggregate.count}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Note moyenne des réponses (1 à 3)
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          {satisfactionCampaign.answers.aggregate.avg.value && (
            <Text>{satisfactionCampaign.answers.aggregate.avg.value.toFixed(2)}</Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export { AdminSatisfactionCampaignInformations };
