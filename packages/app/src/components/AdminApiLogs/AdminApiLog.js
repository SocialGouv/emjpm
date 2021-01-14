import { useQuery } from "@apollo/client";
import { stdFormatter } from "@emjpm/biz";

import { Box, Flex } from "rebass";

import { Card, Text } from "~/ui";

import { API_LOG_BY_ID } from "./queries";

function AdminApiLog({ id }) {
  const { data, loading, error } = useQuery(API_LOG_BY_ID, {
    variables: { id },
  });

  if (loading) {
    return "Loading...";
  }
  const [log] = data?.api_logs;

  if (error || !log) {
    return "Error...";
  }

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
          Date
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{stdFormatter.formatDateUI(log.created_at)}</Text>
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
}

export { AdminApiLog };
