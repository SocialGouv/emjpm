import { Label } from "@rebass/forms";
import React, { Fragment, useMemo } from "react";
import { Box, Text } from "rebass";

const FieldLabel = ({ isRequired, readOnly }) =>
  isRequired && !readOnly
    ? {
        "&:after": {
          content: "'  *'",
          color: "#db4949",
          marginLeft: "3px",
        },
      }
    : {};
export const EnqueteFormFieldLabel = ({ id, label, text, enqueteForm, required, children }) => {
  const { validationSchema, readOnly } = enqueteForm;

  const isRequired = useMemo(() => {
    if (required) {
      return true;
    }
    const fieldValidation = validationSchema.fields[id];
    return fieldValidation && fieldValidation._exclusive && fieldValidation._exclusive.required;
  }, [id, required, validationSchema.fields]);

  return (
    <Fragment>
      {label && (
        <Label sx={FieldLabel({ isRequired, readOnly })} mb={"5px"} htmlFor={id}>
          {label}
        </Label>
      )}
      {text && (
        <Text sx={FieldLabel({ isRequired: isRequired && !label, readOnly })} mb={"5px"}>
          {text}
        </Text>
      )}
      {children ? (
        <Box sx={FieldLabel({ isRequired: isRequired && !label && !text, readOnly })}>
          {children}
        </Box>
      ) : null}
    </Fragment>
  );
};
