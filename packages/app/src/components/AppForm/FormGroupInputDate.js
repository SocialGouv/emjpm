import { Box, Flex } from "rebass";

import { Field, InputDate } from "~/components";

import AppFormFieldErrorMessage from "./AppFormFieldErrorMessage";
import useAppFieldIsRequired from "./useAppFieldIsRequired";

export default function FormGroupInputDate({
  id,
  value,
  placeholder,
  error,
  children,
  readOnly,
  formik,
  hideErrors,
  validationSchema,
  onChange,
  required,
  title,
  ...props
}) {
  const { handleBlur, values } = formik;

  if (value === undefined) {
    value = values[id];
  }

  required = useAppFieldIsRequired({ id, required, validationSchema });

  return (
    <Field>
      <Flex alignItems="center" title={title}>
        <InputDate
          placeholderText={placeholder}
          readOnly={readOnly}
          id={id}
          name={id}
          value={value}
          onBlur={handleBlur}
          onChange={
            onChange ? onChange : (value) => formik.setFieldValue(id, value)
          }
          required={required}
          {...props}
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
}
