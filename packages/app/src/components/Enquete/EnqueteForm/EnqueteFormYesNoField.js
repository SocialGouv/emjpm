import { Field, InlineError } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex } from "rebass";

import { YesNoComboBox } from "../../Commons";

export const EnqueteFormYesNoField = ({ id, value, error, label, enqueteForm, children }) => {
  const { readOnly, formik, showError } = enqueteForm;
  const { setFieldValue, values, errors } = formik;

  if (!value) {
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

      <InlineError showError={showError} message={error} fieldId={id} />
    </Field>
  );
};
