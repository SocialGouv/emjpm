import { Card, Heading3, Heading5 } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box, Text } from "rebass";

import { importErrorsWrapperStyle } from "./style";

const MesureImportErrors = props => {
  const { errors } = props;

  return (
    <Card sx={importErrorsWrapperStyle} overflow="hidden">
      <Heading3 mb={4}>Erreurs par ligne</Heading3>
      {errors.map(({ line, message }, index) => (
        <Box key={`error-${index}`} mb={3}>
          {line ? (
            <Fragment>
              <Heading5 mb={1}>Ligne {line}</Heading5>
              <Text width={1} color="error" key={message}>
                - {message}
              </Text>
            </Fragment>
          ) : (
            <Fragment>
              <Text width={1} color="error" key={message}>
                - {message}
              </Text>
            </Fragment>
          )}
        </Box>
      ))}
    </Card>
  );
};

export { MesureImportErrors };
