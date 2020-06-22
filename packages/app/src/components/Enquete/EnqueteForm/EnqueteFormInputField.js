import { Field, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React, { useMemo } from "react";
import { Box, Flex, Text } from "rebass";

import { SmallInput } from "../../Commons/SmallInput";
import { EnqueteFieldInlineError } from "./EnqueteFieldInlineError";
import { useEnqueteFieldShowError } from "./useEnqueteFieldShowError.hook";

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
  disableErrorMessage,
  hideErrorMessageIfPristine,
}) => {
  const { readOnly, formik, validationSchema } = enqueteForm;
  const { handleChange, handleBlur, values } = formik;

  if (!type || readOnly) {
    type = "text";
  }
  if (value === undefined) {
    value = values[id];
  }

  const isRequired = useMemo(() => {
    const fieldValidation = validationSchema.fields[id];
    return fieldValidation && fieldValidation._exclusive && fieldValidation._exclusive.required;
  }, [id, validationSchema.fields]);

  const showError = useEnqueteFieldShowError({
    id,
    error,
    enqueteForm,
    disableErrorMessage,
    hideErrorMessageIfPristine,
  });

  return (
    <Field>
      {label && (
        <Label sx={FieldLabel({ isRequired })} mb={"5px"} htmlFor={id}>
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
            onBlur={handleBlur}
            onChange={handleChange}
            hasError={showError}
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
            hasError={showError}
            type={type}
            min={min}
            max={max}
          />
        )}
        <Box>{children}</Box>
      </Flex>

      <EnqueteFieldInlineError
        id={id}
        error={error}
        enqueteForm={enqueteForm}
        disableErrorMessage={disableErrorMessage}
        hideErrorMessageIfPristine={hideErrorMessageIfPristine}
      />
    </Field>
  );
};
