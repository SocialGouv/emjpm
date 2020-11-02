import { Field, Input } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { AppFormFieldErrorMessage } from "./core/AppFormFieldErrorMessage";
import { useAppFieldIsRequired } from "./core/useAppFieldIsRequired.hook";
import { useAppFieldShowError } from "./core/useAppFieldShowError.hook";

export const FormGroupInput = ({
  id,
  value,
  placeholder,
  error,
  type,
  min,
  max,
  children,
  required,
  readOnly,
  formik,
  hideErrors,
  validationSchema,
  onChange,
}) => {
  const { handleChange, handleBlur, values } = formik;

  if (!type || readOnly) {
    type = "text";
  }
  if (value === undefined) {
    value = values[id];
  }

  const showError = useAppFieldShowError({
    error,
    formik,
    hideErrors,
    id,
  });

  required = useAppFieldIsRequired({ id, required, validationSchema });

  return (
    <Field>
      <Flex alignItems="center">
        <Input
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          id={id}
          name={id}
          value={value}
          onBlur={handleBlur}
          onChange={onChange ? onChange : handleChange}
          hasError={showError}
          type={type}
          min={min}
          max={max}
        />
        {children ? <Box>{children}</Box> : null}
      </Flex>

      <AppFormFieldErrorMessage
        id={id}
        error={error}
        formik={formik}
        hideErrors={hideErrors}
      />
    </Field>
  );
};
