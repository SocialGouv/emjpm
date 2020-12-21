import React from "react";
import { Box, Flex } from "rebass";

import { SmallInput } from "~/components/Commons/SmallInput";
import { Field, Input } from "~/ui";

import { EnqueteFormFieldErrorMessage } from "./EnqueteFormFieldErrorMessage";
import { EnqueteFormFieldLabel } from "./EnqueteFormFieldLabel";
import { useEnqueteFieldShowError } from "./useEnqueteFieldShowError.hook";

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
  required,
}) => {
  const { readOnly, formik } = enqueteForm;
  const { handleChange, handleBlur, values } = formik;

  if (!type || readOnly) {
    type = "text";
  }
  if (value === undefined) {
    value = values[id];
  }

  const showError = useEnqueteFieldShowError({
    disableErrorMessage,
    enqueteForm,
    error,
    hideErrorMessageIfPristine,
    id,
  });

  return (
    <Field>
      <EnqueteFormFieldLabel
        id={id}
        label={label}
        text={text}
        required={required}
        enqueteForm={enqueteForm}
      />

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
        {children ? <Box>{children}</Box> : null}
      </Flex>

      <EnqueteFormFieldErrorMessage
        id={id}
        error={error}
        enqueteForm={enqueteForm}
        disableErrorMessage={disableErrorMessage}
        hideErrorMessageIfPristine={hideErrorMessageIfPristine}
      />
    </Field>
  );
};
