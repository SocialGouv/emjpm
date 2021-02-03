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
