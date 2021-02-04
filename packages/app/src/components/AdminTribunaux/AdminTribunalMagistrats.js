import { Box, Flex } from "rebass";

import { Card, Heading, Text } from "~/ui";

export function AdminTribunalMagistrats({ magistrats }) {
  return (
    <Card>
      <Heading size={4}>{"Liste des magistrats"}</Heading>
      <Flex flexWrap="wrap">
        {magistrats.map(({ user: { id, email } }) => {
          return (
            <Box px={1} key={id}>
              <Text>{email}</Text>
            </Box>
          );
        })}
      </Flex>
    </Card>
  );
}
