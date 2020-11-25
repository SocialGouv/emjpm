export const regionsToOptions = (datas) => {
  const all = [
    {
      label: "Toutes les régions",
      value: null,
    },
  ];
  Array.prototype.push.apply(all, toOptions(datas, "id", "nom"));
  return all;
};

export const departementToOptions = (datas) => {
  const all = [];
  if (datas && datas.length > 1) {
    all.push({
      label: "Tous les départements",
      value: null,
    });
  }
  Array.prototype.push.apply(all, toOptions(datas, "id", "nom"));
  all.sort(function (a, b) {
    return a.label - b.label;
  });
  return all;
};

export const toOptions = (data, valueKey, labelKey) =>
  !data?.length
    ? []
    : data.map((elt) => ({
        label: elt[labelKey],
        value: elt[valueKey],
      }));

export const findOption = (options, value) => {
  if (!options || !options.length) {
    return undefined;
  }
  return options.find((option) => option.value === value);
};

export const findOptions = (options, values) => {
  if (!options || !options.length) {
    return undefined;
  }
  if (!values) {
    return undefined;
  }
  return options.filter((option) => values.includes(option.value));
};

export const getOptionValue = (option) => {
  return option ? option.value : null;
};
