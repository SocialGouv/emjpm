import { Field } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex } from "rebass";

import { YesNoComboBox } from "../../Commons";
import { EnqueteInlineError } from "./EnqueteInlineError";

export const EnqueteFormYesNoField = ({
  id,
  value,
  error,
  label,
  enqueteForm,
  children,
  disableErrorMessage,
}) => {
  const { readOnly, formik } = enqueteForm;
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

      <EnqueteInlineError
        id={id}
        error={error}
        enqueteForm={enqueteForm}
        disableErrorMessage={disableErrorMessage}
      />
    </Field>
  );
};
