import { Field, Input, Select } from "@emjpm/ui";
import React, { useMemo } from "react";

import { findOption } from "../../../util/option/OptionUtil";
import { EnqueteFormFieldErrorMessage } from "./EnqueteFormFieldErrorMessage";
import { EnqueteFormFieldLabel } from "./EnqueteFormFieldLabel";
import { useEnqueteFieldShowError } from "./useEnqueteFieldShowError.hook";

export const EnqueteFormSelectField = ({
  id,
  value,
  error,
  label,
  text,
  options,
  required,
  enqueteForm,
  disableErrorMessage,
  hideErrorMessageIfPristine,
}) => {
  const { readOnly, formik } = enqueteForm;
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

  const showError = useEnqueteFieldShowError({
    disableErrorMessage,
    enqueteForm,
    error,
    hideErrorMessageIfPristine,
    id,
  });

  return (
    <Field>
      <EnqueteFormFieldLabel
        id={id}
        label={label}
        text={text}
        required={required}
        enqueteForm={enqueteForm}
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

      <EnqueteFormFieldErrorMessage
        id={id}
        error={error}
        enqueteForm={enqueteForm}
        disableErrorMessage={disableErrorMessage}
        hideErrorMessageIfPristine={hideErrorMessageIfPristine}
      />
    </Field>
  );
};
