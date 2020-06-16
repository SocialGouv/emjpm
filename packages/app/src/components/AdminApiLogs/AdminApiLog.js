import { useQuery } from "@apollo/react-hooks";
import { Card, Text } from "@emjpm/ui";
import { format } from "date-fns";
import React from "react";
import { Box, Flex } from "rebass";

import { API_LOG_BY_ID } from "./queries";

const AdminApiLog = (props) => {
  const { id } = props;

  const { data, loading, error } = useQuery(API_LOG_BY_ID, { variables: { id } });

  if (loading) {
    return "Loading...";
  }

  if (error || !data.api_logs.length) {
    return "Error...";
  }

  const [log] = data.api_logs;

  return (
    <Card mt={2}>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          ID
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{log.id}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          ID
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{format(new Date(log.created_at), "dd/MM/yyyy")}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          URL
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{log.request_url}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Method
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{log.request_method}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Request params
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{JSON.stringify(log.request_params)}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Token
        </Box>
        <Box sx={{ "word-break": "break-all" }} width={2 / 3} px={4} py={2}>
          <Text>{log.token}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Response
        </Box>
        <Box sx={{ "word-break": "break-all" }} width={2 / 3} px={4} py={2}>
          <Text>{JSON.stringify(log.response)}</Text>
        </Box>
      </Flex>
    </Card>
  );
};

export { AdminApiLog };
