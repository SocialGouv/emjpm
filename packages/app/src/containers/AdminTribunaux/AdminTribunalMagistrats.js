import { Box, Flex } from "rebass";

import { Card, Heading, Text } from "~/components";

export function AdminTribunalMagistrats({ magistrats }) {
  return (
    <Card>
      <Heading size={4}>{"Liste des magistrats"}</Heading>
      <Flex flexWrap="wrap">
        {magistrats.length === 0 && (
          <Box px={1}>
            <Text>Aucun magistrat n'est associé à ce tribunal</Text>
          </Box>
        )}
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
