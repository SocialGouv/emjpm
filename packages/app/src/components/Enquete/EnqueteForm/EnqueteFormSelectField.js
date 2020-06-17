import { Field, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React, { useMemo } from "react";

import { findOption } from "../../../util/option/OptionUtil";

export const EnqueteFormSelectField = ({ id, label, options, enqueteContext, enqueteForm }) => {
  const enqueteReponseStatus = enqueteContext.enqueteReponse.status;
  const readOnly = enqueteReponseStatus !== "draft";

  const { formik, showError } = enqueteForm;
  const { values, errors, setFieldValue, handleBlur, handleChange } = formik;

  const readOnlyValue = useMemo(() => {
    if (readOnly) {
      const option = findOption(options, values[id]);
      if (option) {
        return option.label;
      }
    }
  }, [id, options, readOnly, values]);

  return (
    <Field>
      <Label mb={1} htmlFor={id}>
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
          hasError={showError && !!errors[id]}
        />
      ) : (
        <Select
          id={id}
          instanceId={id}
          placeholder=""
          hasError={showError && !!errors[id]}
          onChange={({ value }) => setFieldValue(id, value)}
          value={findOption(options, values[id])}
          options={options}
        />
      )}
      <InlineError showError={showError} message={errors[id]} fieldId={id} />
    </Field>
  );
};

export default EnqueteFormSelectField;
