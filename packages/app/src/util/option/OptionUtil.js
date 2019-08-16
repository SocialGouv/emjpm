export const toOptions = (datas, idKey, labelKey) =>
  datas.map(data => ({
    id: data[idKey],
    label: data[labelKey]
  }));
