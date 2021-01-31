import { useMemo, useState, useEffect, useRef } from "react";

import { Field, Input, Select } from "~/ui";

import { AppFormFieldErrorMessage } from "./core/AppFormFieldErrorMessage";
import { useAppFieldIsRequired } from "./core/useAppFieldIsRequired.hook";
import { useAppFieldShowError } from "./core/useAppFieldShowError.hook";

function findOption(options = [], value) {
  return options.find((option) => option.value === value) || null;
}

// https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/Creatable.js
function ensureOption(options = [], value, props) {
  if (value && !findOption(options, value)) {
    const {
      createOptionPosition,
      getNewOptionData,
      isLoading,
      isValidNewOption,
    } = props;
    if (isValidNewOption(value, options)) {
      const newOption = getNewOptionData(value, value);
      // console.log("add missing option from value", newOption);
      options =
        createOptionPosition === "first"
          ? [newOption, ...options]
          : [...options, newOption];
    }
  }
  return options;
}

export function FormGroupSelect(props) {
  let {
    id,
    placeholder,
    label,
    readOnly,
    formik,
    hideErrors,
    validationSchema,
    onChange,
    isClearable,
    size,
    createOptionPosition,
    component: Component = Select,
    value,
    error,
    required,
    options,
    ...componentProps
  } = props;

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

  options = useMemo(() => {
    return ensureOption(options, value, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, value]);

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

  console.log("findOption", id, value, findOption(options, value));

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
            if (!props || typeof props !== "object") {
              props = { value: props, label: props };
            }
            // console.log("onChange", { id, value: props?.value });
            if (onChange) {
              return onChange(props);
            }
            setFieldValue(id, props?.value || null);
          }}
          value={findOption(options, value)}
          isClearable={isClearable}
          size={size ? size : ""}
          {...componentProps}
          options={options}
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

// https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/Creatable.js
// https://github.com/JedWatson/react-select/blob/edc14e4d5406d4a6d6aaf6c0f66cd6850463ad28/packages/react-select/src/Creatable.js
const compareOption = (inputValue = "", option) => {
  const candidate = String(inputValue).toLowerCase();
  const optionValue = String(option.value).toLowerCase();
  const optionLabel = String(option.label).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};
FormGroupSelect.defaultProps = {
  formatCreateLabel: (inputValue) => `"${inputValue}"`,
  isValidNewOption: (inputValue, selectOptions) =>
    !(
      !inputValue ||
      selectOptions.some((option) => compareOption(inputValue, option))
    ),
  getNewOptionData: (inputValue, optionLabel) => ({
    label: optionLabel,
    value: inputValue,
    __isNew__: true,
  }),
};
