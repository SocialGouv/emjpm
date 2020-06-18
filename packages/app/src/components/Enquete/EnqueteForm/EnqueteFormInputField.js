import { Field, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { SmallInput } from "../../Commons/SmallInput";

export const EnqueteFormInputField = ({
  id,
  value,
  error,
  label,
  text,
  size,
  type,
  min,
  max,
  enqueteForm,
  children,
}) => {
  const { readOnly, formik, showError } = enqueteForm;
  const { handleChange, handleBlur, values, errors } = formik;

  if (!type || readOnly) {
    type = "text";
  }
  if (value === undefined) {
    value = values[id];
  }
  if (!error) {
    error = errors[id];
  }

  return (
    <Field>
      {label && (
        <Label mb={"5px"} htmlFor={id}>
          {label}
        </Label>
      )}
      {text && <Text mb={"5px"}>{text}</Text>}

      <Flex alignItems="center">
        {size === "small" || size === "medium" ? (
          <SmallInput
            placeholder=""
            readOnly={readOnly}
            id={id}
            name={id}
            value={value}
            onChange={handleChange}
            hasError={showError && !!error}
            type={type}
            min={min}
            max={max}
            minWidth={size === "small" ? "60px" : "180px"}
          />
        ) : (
          <Input
            placeholder=""
            readOnly={readOnly}
            id={id}
            name={id}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            hasError={showError && !!error}
            type={type}
            min={min}
            max={max}
          />
        )}
        <Box>{children}</Box>
      </Flex>

      <InlineError showError={showError} message={error} fieldId={id} />
    </Field>
  );
};
