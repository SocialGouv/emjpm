import { Field, Input, Select } from "@emjpm/ui";
import React, { useMemo } from "react";

import { findOption } from "../../util/option/OptionUtil";
import { AppFormFieldErrorMessage } from "./AppFormFieldErrorMessage";
import { AppFormFieldLabel } from "./AppFormFieldLabel";
import { useAppFieldShowError } from "./useAppFieldShowError.hook";

export const AppFormSelectField = ({
  id,
  value,
  error,
  label,
  text,
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
      <AppFormFieldLabel
        id={id}
        label={label}
        text={text}
        readOnly={readOnly}
        required={required}
      />

      {readOnly ? (
        <Input
          placeholder=""
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
          placeholder=""
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
