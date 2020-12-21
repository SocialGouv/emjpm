import React from "react";
import { Flex, Text } from "rebass";

import { Card, Heading3 } from "~/ui";

import { importErrorsWrapperStyle } from "./style";

const MesureImportErrors = (props) => {
  const { errors } = props;

  return (
    <Card sx={importErrorsWrapperStyle} overflow="hidden">
      <Heading3 mb={4}>Détail des erreurs par ligne</Heading3>
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
};

export { MesureImportErrors };
