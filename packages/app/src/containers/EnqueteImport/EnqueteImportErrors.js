import { Flex, Text } from "rebass";

import { Card, Heading } from "~/components";

import { importErrorsWrapperStyle } from "./style";

function EnqueteImportErrors(props) {
  const { errors } = props;

  return (
    <Card sx={importErrorsWrapperStyle} overflow="hidden">
      <Heading size={3} mb={4}>
        Détail des erreurs par ligne
      </Heading>
      {errors.map(({ line = 0, message }) => (
        <Flex key={`${line}-${message}`} mb={1}>
          <Text color="warning" mr={1}>
            LIGNE {line}
          </Text>
          <Text>{message}</Text>
        </Flex>
      ))}
    </Card>
  );
}

export { EnqueteImportErrors };
