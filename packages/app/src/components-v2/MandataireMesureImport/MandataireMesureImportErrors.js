import { Card, Heading3, Heading5 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Text } from "rebass";

import { importErrorsWrapperStyle } from "./style";

const MandataireMesureImportErrors = props => {
  const { errors } = props;

  return (
    <Card sx={importErrorsWrapperStyle} overflow="hidden">
      <Heading3 mb={4}>Erreurs par ligne</Heading3>
      {errors.map(({ line, messages }, index) => (
        <Box key={`error-${index}`} mb={3}>
          {line ? (
            <>
              <Heading5 mb={1}>Ligne {line}</Heading5>
              {messages.map(message => (
                <Text width={1} color="error" key={message}>
                  - {message}
                </Text>
              ))}
            </>
          ) : (
            <>
              {messages.map(message => (
                <Text width={1} color="error" key={message}>
                  - {message}
                </Text>
              ))}
            </>
          )}
        </Box>
      ))}
    </Card>
  );
};

export default MandataireMesureImportErrors;
