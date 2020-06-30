import { Label } from "@rebass/forms";
import React, { Fragment } from "react";
import { Box, Text } from "rebass";

const FieldLabel = ({ required, readOnly }) =>
  required && !readOnly
    ? {
        "&:after": {
          content: "'  *'",
          color: "#db4949",
          marginLeft: "3px",
        },
      }
    : {};
export const AppFormFieldLabel = ({ id, label, text, readOnly, required, children }) => {
  return (
    <Fragment>
      {label && (
        <Label sx={FieldLabel({ required, readOnly })} mb={"5px"} htmlFor={id}>
          {label}
        </Label>
      )}
      {text && (
        <Text sx={FieldLabel({ required: required && !label, readOnly })} mb={"5px"}>
          {text}
        </Text>
      )}
      {children ? (
        <Box sx={FieldLabel({ required: required && !label && !text, readOnly })}>{children}</Box>
      ) : null}
    </Fragment>
  );
};
