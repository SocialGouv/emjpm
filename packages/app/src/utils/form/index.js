export function parseFormFloat(value, defaultValue = null) {
  return value !== "" && !isNaN(parseFloat(value))
    ? parseFloat(value)
    : defaultValue;
}

export function parseFormInt(value, defaultValue = null) {
  return value !== "" && !isNaN(parseInt(value, 10))
    ? parseInt(value, 10)
    : defaultValue;
}

export function parseFormInput(value, defaultValue = null) {
  return value !== "" ? value : defaultValue;
}

export function formatFormInput(value) {
  return value === null || value === undefined ? "" : value;
}

export function formatFormBoolean(value) {
  return value !== true && value !== false ? undefined : value;
}

export const toOptions = (data, valueKey, labelKey) =>
  !data?.length
    ? []
    : data.map((elt) => ({
        label: elt[labelKey],
        value: elt[valueKey],
      }));

export function findOption(options, value) {
  if (!options || !options.length) {
    return undefined;
  }
  return options.find((option) => option.value === value);
}

export function findOptions(options, values) {
  if (!options || !options.length) {
    return undefined;
  }
  if (!values) {
    return undefined;
  }
  return options.filter((option) => values.includes(option.value));
}

export function getOptionValue(option) {
  return option ? option.value : null;
}
