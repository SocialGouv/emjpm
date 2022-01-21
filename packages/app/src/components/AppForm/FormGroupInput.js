import { Box, Flex } from "rebass";

import { Field, Input } from "~/components";

import AppFormFieldErrorMessage from "./AppFormFieldErrorMessage";
import useAppFieldIsRequired from "./useAppFieldIsRequired";
import useAppFieldShowError from "./useAppFieldShowError";
import { useCallback } from "react";

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
  onInput,
  onChange,
  size,
  noRequiredAsterisk,
  normalizers = [],
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

  const onChangeDefault = useCallback(
    (e) => {
      let { value } = e.target;
      for (const normalize of normalizers) {
        value = normalize(value);
      }
      e.target.value = value;
      return handleChange(e);
    },
    [handleChange, normalizers]
  );

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
          onChange={onChange ? onChange : onInput ? undefined : onChangeDefault}
          onInput={onInput}
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
