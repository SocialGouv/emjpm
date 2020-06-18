import { Field, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React, { useMemo } from "react";

import { findOption } from "../../../util/option/OptionUtil";

export const EnqueteFormSelectField = ({ id, value, error, label, options, enqueteForm }) => {
  const { readOnly, formik, showError } = enqueteForm;
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

  return (
    <Field>
      <Label mb={"5px"} htmlFor={id}>
        {label}
      </Label>
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
          hasError={showError && !!error}
        />
      ) : (
        <Select
          id={id}
          instanceId={id}
          placeholder=""
          hasError={showError && !!error}
          onChange={({ value }) => setFieldValue(id, value)}
          value={findOption(options, value)}
          options={options}
        />
      )}
      <InlineError showError={showError} message={errors[id]} fieldId={id} />
    </Field>
  );
};
