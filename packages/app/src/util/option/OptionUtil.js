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
  const all = [
    {
      label: "Tous les départements",
      value: null,
    },
  ];
  Array.prototype.push.apply(all, toOptions(datas, "id", "nom"));
  all.sort(function (a, b) {
    return a.label - b.label;
  });
  return all;
};

export const toOptions = (datas, idKey, labelKey) =>
  datas.map((data) => ({
    label: data[labelKey],
    value: data[idKey],
  }));

export const findOption = (options, value) => {
  if (!options || !options.length) {
    return undefined;
  }
  return options.find((option) => option.value === value);
};

export const getOptionValue = (option) => {
  return option ? option.value : null;
};
