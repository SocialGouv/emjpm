import { Field, Input } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { SmallInput } from "../Commons/SmallInput";
import { AppFormFieldErrorMessage } from "./AppFormFieldErrorMessage";
import { AppFormFieldLabel } from "./AppFormFieldLabel";
import { useAppFieldIsRequired } from "./useAppFieldIsRequired.hook";
import { useAppFieldShowError } from "./useAppFieldShowError.hook";

export const AppFormInputField = ({
  id,
  value,
  placeholder,
  error,
  label,
  text,
  size,
  type,
  min,
  max,
  children,
  required,
  readOnly,
  formik,
  hideErrors,
  validationSchema,
}) => {
  const { handleChange, handleBlur, values } = formik;

  if (!type || readOnly) {
    type = "text";
  }
  if (value === undefined) {
    value = values[id];
  }

  const showError = useAppFieldShowError({
    id,
    error,
    formik,
    hideErrors,
  });

  required = useAppFieldIsRequired({ id, required, validationSchema });

  return (
    <Field>
      <AppFormFieldLabel
        id={id}
        label={label}
        text={text}
        readOnly={readOnly}
        required={required}
      />

      <Flex alignItems="center">
        {size === "small" || size === "medium" ? (
          <SmallInput
            placeholder={placeholder}
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
            placeholder={placeholder}
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
        {children ? <Box>{children}</Box> : null}
      </Flex>

      <AppFormFieldErrorMessage id={id} error={error} formik={formik} hideErrors={hideErrors} />
    </Field>
  );
};
