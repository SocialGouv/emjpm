import { Box, Flex } from "rebass";

import { Card, Heading4, Text } from "~/ui";

export function AdminTribunalMagistrats({ magistrats }) {
  return (
    <Card>
      <Heading4>{"Liste des magistrats"}</Heading4>
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
