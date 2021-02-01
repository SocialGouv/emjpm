import { useMemo, useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Field, Input, Select, SelectCreatable } from "~/ui";

import { AppFormFieldErrorMessage } from "./core/AppFormFieldErrorMessage";
import { useAppFieldIsRequired } from "./core/useAppFieldIsRequired.hook";
import { useAppFieldShowError } from "./core/useAppFieldShowError.hook";

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
    onInputChange,
    isClearable,
    size,
    value,
    error,
    required,
    options = defaultProps.options,
    setSelectedOption,
    component: Component,
    loadOptions,
    isLoading: isLoadingProp,
    debounceInterval = defaultProps.debounceInterval,
    isCreatable,
    createOptionPosition = defaultProps.createOptionPosition,
    filterOption = defaultProps.filterOption,
    formatCreateLabel = defaultProps.formatCreateLabel,
    isValidNewOption = defaultProps.isValidNewOption,
    getNewOptionData = defaultProps.getNewOptionData,
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

  // async
  const [loadState, setLoadState] = useState(() => ({
    isLoading: false,
    loadedOptions: [],
  }));

  const debouncedLoadOptions = useDebouncedCallback(async (inputValue) => {
    let loadedOptions;
    try {
      loadedOptions = await loadOptions(inputValue);
    } catch (e) {
      loadedOptions = [];
    }
    setLoadState({ isLoading: false, loadedOptions });
  }, debounceInterval);
  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
    };
  }, [debouncedLoadOptions]);
  let loadCallback;
  if (loadOptions) {
    loadCallback = (inputValue) => {
      if (!loadState.isLoading) {
        setLoadState({ isLoading: true, loadedOptions: [] });
      }
      debouncedLoadOptions.callback(inputValue);
    };
  }
  options = useMemo(() => {
    return [...options, ...loadState.loadedOptions];
  }, [options, loadState.loadedOptions]);
  const inputValueRef = useRef();
  const isLoading = isLoadingProp || loadState.isLoading;

  // creatable
  const createOptions = useMemo(
    () => ({
      createOptionPosition,
      getNewOptionData,
      isValidNewOption,
    }),
    [createOptionPosition, getNewOptionData, isValidNewOption]
  );
  options = useMemo(() => {
    return isCreatable ? ensureOption(options, value, createOptions) : options;
  }, [isCreatable, options, value, createOptions]);

  // readOnly
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

  if (!Component) {
    if (loadOptions || isCreatable) {
      Component = SelectCreatable;
    } else {
      Component = Select;
    }
  }

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
          onInputChange={(value, event) => {
            onInputChange && onInputChange(value, event);

            const { action } = event;
            if (action === "input-change") {
              if (inputValueRef.current !== value) {
                loadCallback && loadCallback(value);
              }
              inputValueRef.current = value;
            }
          }}
          onChange={(props) => {
            if (!props || typeof props !== "object") {
              props = { value: props, label: props };
            }
            if (onChange) {
              return onChange(props);
            }
            setFieldValue(id, props?.value || null);
            setSelectedOption && setSelectedOption(props);
          }}
          value={findOption(options, value)}
          isClearable={isClearable}
          size={size ? size : ""}
          options={options}
          isLoading={isLoading}
          formatCreateLabel={formatCreateLabel}
          isValidNewOption={isValidNewOption}
          getNewOptionData={getNewOptionData}
          filterOption={filterOption}
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

const defaultProps = {
  filterOption: () => true,
  formatCreateLabel: (inputValue) => `"${inputValue}"`,
  debounceInterval: 300,
  createOptionPosition: "last",
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
  options: [],
};

function findOption(options = [], value) {
  return options.find((option) => option.value === value) || null;
}

// add missing option from value, for creatable (and initial value)
function ensureOption(options = [], value, createOptions) {
  if (value && !findOption(options, value)) {
    const {
      createOptionPosition,
      getNewOptionData,
      isValidNewOption,
    } = createOptions;
    if (isValidNewOption(value, options)) {
      const newOption = getNewOptionData(value, value);
      options =
        createOptionPosition === "first"
          ? [newOption, ...options]
          : [...options, newOption];
    }
  }
  return options;
}

// https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/Creatable.js
// https://github.com/JedWatson/react-select/blob/edc14e4d5406d4a6d6aaf6c0f66cd6850463ad28/packages/react-select/src/Creatable.js
function compareOption(inputValue = "", option) {
  const candidate = String(inputValue).toLowerCase();
  const optionValue = String(option.value).toLowerCase();
  const optionLabel = String(option.label).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
}
