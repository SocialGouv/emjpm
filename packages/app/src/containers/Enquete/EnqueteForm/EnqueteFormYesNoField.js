import { Box, Flex } from "rebass";

import { YesNoComboBox } from "~/containers/Commons";
import { Field } from "~/components";

import { EnqueteFormFieldErrorMessage } from "./EnqueteFormFieldErrorMessage";
import { EnqueteFormFieldLabel } from "./EnqueteFormFieldLabel";

export function EnqueteFormYesNoField({
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
}) {
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
}
