import { Field } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { YesNoComboBox } from "../Commons";
import { AppFormFieldErrorMessage } from "./AppFormFieldErrorMessage";
import { AppFormFieldLabel } from "./AppFormFieldLabel";

export const AppFormYesNoField = ({
  id,
  value,
  error,
  label,
  text,
  children,
  required,
  readOnly,
  formik,
  hideErrors,
}) => {
  const { setFieldValue, values, errors } = formik;

  if (!value) {
    value = values[id];
  }
  if (!error) {
    error = errors[id];
  }

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

      <AppFormFieldErrorMessage id={id} error={error} formik={formik} hideErrors={hideErrors} />
    </Field>
  );
};
