import { Box, Flex } from "rebass";

import { Field, Input } from "~/components";

import AppFormFieldErrorMessage from "./AppFormFieldErrorMessage";
import useAppFieldIsRequired from "./useAppFieldIsRequired";
import useAppFieldShowError from "./useAppFieldShowError";

export default function FormGroupInput({
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
  noRequiredAsterix,
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
          noRequiredAsterix={noRequiredAsterix}
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
