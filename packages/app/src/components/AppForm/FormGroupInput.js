import { Box, Flex } from "rebass";

import { Field, Input } from "~/components";

import AppFormFieldErrorMessage from "./AppFormFieldErrorMessage";
import useAppFieldIsRequired from "./useAppFieldIsRequired";
import useAppFieldShowError from "./useAppFieldShowError";

export default function FormGroupInput({
  id,
  value,
  label,
  title,
  placeholder,
  forceActive,
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
  noRequiredAsterisk,
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
          forceActive={forceActive}
          readOnly={readOnly}
          required={required}
          id={id}
          aria-describedby={`msg-${id}`}
          name={id}
          title={title}
          value={value}
          onBlur={handleBlur}
          onChange={onChange ? onChange : handleChange}
          hasError={showError}
          type={type}
          min={min}
          max={max}
          size={size ? size : ""}
          noRequiredAsterisk={noRequiredAsterisk}
        />
        {children ? <Box>{children}</Box> : null}
      </Flex>
      <div id={`msg-${id}`}>
        <AppFormFieldErrorMessage
          id={id}
          error={error}
          formik={formik}
          hideErrors={hideErrors}
        />
      </div>
    </Field>
  );
}
