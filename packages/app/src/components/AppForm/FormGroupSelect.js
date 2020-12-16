import { Field, Input, Select } from "@emjpm/ui";
import React, { useMemo } from "react";

import { findOption } from "~/util/option/OptionUtil";

import { AppFormFieldErrorMessage } from "./core/AppFormFieldErrorMessage";
import { useAppFieldIsRequired } from "./core/useAppFieldIsRequired.hook";
import { useAppFieldShowError } from "./core/useAppFieldShowError.hook";

export const FormGroupSelect = ({
  id,
  value,
  error,
  placeholder,
  options,
  readOnly,
  formik,
  required,
  hideErrors,
  validationSchema,
  onChange,
  isClearable = false,
  size,
}) => {
  const { values, errors, setFieldValue, handleBlur, handleChange } = formik;

  if (!value) {
    value = values[id];
  }
  if (!error) {
    error = errors[id];
  }

  const readOnlyValue = useMemo(() => {
    if (readOnly) {
      const option = findOption(options, value);
      if (option) {
        return option.label;
      }
    }
  }, [options, readOnly, value]);

  const showError = useAppFieldShowError({
    error,
    formik,
    hideErrors,
    id,
  });

  required = useAppFieldIsRequired({ id, required, validationSchema });

  return (
    <Field>
      {readOnly ? (
        <Input
          placeholder={placeholder}
          type="text"
          readOnly={true}
          id={id}
          name={id}
          value={readOnlyValue}
          onBlur={handleBlur}
          onChange={handleChange}
          hasError={showError}
        />
      ) : (
        <Select
          id={id}
          instanceId={id}
          placeholder={placeholder}
          required={required}
          hasError={showError}
          onChange={
            onChange
              ? onChange
              : (props) => {
                  setFieldValue(id, props?.value || "");
                }
          }
          value={findOption(options, value)}
          options={options}
          isClearable={isClearable}
          size={size ? size : ""}
        />
      )}

      <AppFormFieldErrorMessage
        id={id}
        error={error}
        formik={formik}
        hideErrors={hideErrors}
      />
    </Field>
  );
};
