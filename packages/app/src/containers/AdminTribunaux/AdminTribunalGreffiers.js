import { Box, Flex } from "rebass";

import { Card, Heading, Text } from "~/components";

export function AdminTribunalGreffiers({ greffiers }) {
  return (
    <Card>
      <Heading size={4}>{"Liste des greffiers"}</Heading>
      <Flex flexWrap="wrap">
        {greffiers.length === 0 && (
          <Box px={1}>
            <Text>Aucun greffier n'est associé à ce tribunal</Text>
          </Box>
        )}
        {greffiers.map(({ user: { id, email } }) => {
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
