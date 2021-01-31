import { useMemo, useState, useEffect, useRef } from "react";

import { Field, Input, Select } from "~/ui";
import { findOption } from "~/util/option/OptionUtil";

import { AppFormFieldErrorMessage } from "./core/AppFormFieldErrorMessage";
import { useAppFieldIsRequired } from "./core/useAppFieldIsRequired.hook";
import { useAppFieldShowError } from "./core/useAppFieldShowError.hook";

function ensureOption(options, value) {
  if (!findOption(options, value)) {
    options = [...(options || []), { value, label: value }];
  }
  return options;
}

export function FormGroupSelect({
  id,
  value,
  error,
  placeholder,
  label,
  options: originalOptions,
  readOnly,
  formik,
  required,
  hideErrors,
  validationSchema,
  onChange,
  isClearable = false,
  size,
  component: Component = Select,
  ...componentProps
}) {
  const {
    values,
    errors,
    setFieldValue,
    setTouched,
    handleBlur,
    handleChange,
  } = formik;

  if (!value) {
    value = values[id];
  }
  if (!error) {
    error = errors[id];
  }

  const [options, setOptions] = useState(() => ensureOption(originalOptions));
  const originalOptionsJSON = useRef(() => JSON.stringify(originalOptions));
  useEffect(() => {
    const newOriginalOptionJSON = JSON.stringify(originalOptions);
    if (originalOptionsJSON.current === newOriginalOptionJSON) {
      return;
    }
    originalOptionsJSON.current = newOriginalOptionJSON;
    setOptions(ensureOption(originalOptions, value));
  }, [originalOptions, value]);

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
          label={label}
          type="text"
          readOnly={true}
          id={id}
          name={id}
          value={readOnlyValue}
          onBlur={handleBlur}
          onChange={handleChange}
          hasError={showError}
          {...componentProps}
        />
      ) : (
        <Component
          id={id}
          instanceId={id}
          placeholder={placeholder}
          label={label}
          required={required}
          hasError={showError}
          onBlur={() => {
            setTouched({ ...formik.touched, [id]: true });
          }}
          onChange={(props) => {
            if (onChange) {
              return onChange(props);
            }
            setFieldValue(id, props?.value || null);
          }}
          value={findOption(options, value)}
          options={options}
          setOptions={setOptions}
          isClearable={isClearable}
          size={size ? size : ""}
          {...componentProps}
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
}
