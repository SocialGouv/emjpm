export const regionsToOptions = datas => {
  return toOptions(datas, "id", "nom");
};

export const departementToOptions = datas => {
  return toOptions(datas, "code", "nom");
};

export const toOptions = (datas, idKey, labelKey) =>
  datas.map(data => ({
    value: data[idKey],
    label: data[labelKey]
  }));
