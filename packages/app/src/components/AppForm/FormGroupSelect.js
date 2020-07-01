import { Field, Input, Select } from "@emjpm/ui";
import React, { useMemo } from "react";

import { findOption } from "../../util/option/OptionUtil";
import { AppFormFieldErrorMessage } from "./core/AppFormFieldErrorMessage";
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
    id,
    error,
    formik,
    hideErrors,
  });

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
          onChange={({ value }) => setFieldValue(id, value)}
          value={findOption(options, value)}
          options={options}
        />
      )}

      <AppFormFieldErrorMessage id={id} error={error} formik={formik} hideErrors={hideErrors} />
    </Field>
  );
};
