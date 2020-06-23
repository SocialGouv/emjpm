import { Field } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { YesNoComboBox } from "../../Commons";
import { EnqueteFormFieldErrorMessage } from "./EnqueteFormFieldErrorMessage";
import { EnqueteFormFieldLabel } from "./EnqueteFormFieldLabel";

export const EnqueteFormYesNoField = ({
  id,
  value,
  error,
  label,
  text,
  enqueteForm,
  children,
  required,
  disableErrorMessage,
  hideErrorMessageIfPristine,
}) => {
  const { readOnly, formik } = enqueteForm;
  const { setFieldValue, values, errors } = formik;

  if (!value) {
    value = values[id] || false;
  }
  if (!error) {
    error = errors[id];
  }

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
        <YesNoComboBox
          readOnly={readOnly}
          value={value}
          name={id}
          onChange={(value) => {
            setFieldValue(id, value);
          }}
        />
        <Box>{children}</Box>
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
