import { Label } from "@rebass/forms";
import React, { Fragment, useMemo } from "react";
import { Text } from "rebass";

const FieldLabel = ({ isRequired }) =>
  isRequired
    ? {
        "&:after": {
          content: "'  *'",
          color: "#db4949",
          marginLeft: "3px",
        },
      }
    : {};

export const EnqueteFormFieldLabel = ({ id, label, text, enqueteForm }) => {
  const { validationSchema } = enqueteForm;

  const isRequired = useMemo(() => {
    const fieldValidation = validationSchema.fields[id];
    return fieldValidation && fieldValidation._exclusive && fieldValidation._exclusive.required;
  }, [id, validationSchema.fields]);

  return (
    <Fragment>
      {label && (
        <Label sx={FieldLabel({ isRequired })} mb={"5px"} htmlFor={id}>
          {label}
        </Label>
      )}
      {text && <Text mb={"5px"}>{text}</Text>}
    </Fragment>
  );
};
