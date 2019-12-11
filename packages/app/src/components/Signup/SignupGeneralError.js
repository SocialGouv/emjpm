import { Text } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

const SignupGeneralError = ({ errors }) => {
  return (
    <>
      {errors && errors.general && (
        <Box
          mb={3}
          sx={{
            border: "1px solid red",
            padding: "10px"
          }}
        >
          {errors.general.map((error, index) => (
            <Text key={index} m={2} style={{ color: "red" }}>
              {error}
            </Text>
          ))}
        </Box>
      )}
    </>
  );
};

export { SignupGeneralError };
