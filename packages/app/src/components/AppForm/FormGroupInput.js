import { Box, Flex } from "rebass";

import { Field, Input } from "~/ui";

import { AppFormFieldErrorMessage } from "./core/AppFormFieldErrorMessage";
import { useAppFieldIsRequired } from "./core/useAppFieldIsRequired.hook";
import { useAppFieldShowError } from "./core/useAppFieldShowError.hook";

export function FormGroupInput({
  id,
  value,
  label,
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
  size,
}) {
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
          label={label}
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
          size={size ? size : ""}
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
