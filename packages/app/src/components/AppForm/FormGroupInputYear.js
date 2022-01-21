import { Box, Flex } from "rebass";

import { Field, InputYear } from "~/components";

import AppFormFieldErrorMessage from "./AppFormFieldErrorMessage";
import useAppFieldIsRequired from "./useAppFieldIsRequired";

export default function FormGroupInputYear({
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
  errorMessage,
  ...props
}) {
  const { handleBlur, values } = formik;

  if (value === undefined) {
    value = values[id];
  }

  required = useAppFieldIsRequired({ id, required, validationSchema });

  return (
    <Field>
      <Flex alignItems="center">
        <InputYear
          placeholderText={placeholder}
          readOnly={readOnly}
          id={id}
          aria-describedby={`msg-${id}`}
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

      <div id={`msg-${id}`}>
        <AppFormFieldErrorMessage
          id={id}
          error={errorMessage ? errorMessage : error}
          formik={formik}
          hideErrors={hideErrors}
        />
      </div>
    </Field>
  );
}
