export const regionsToOptions = datas => {
  const all = [
    {
      label: "Toutes les régions",
      value: null
    }
  ];
  Array.prototype.push.apply(all, toOptions(datas, "id", "nom"));
  return all;
};

export const departementToOptions = datas => {
  const all = [
    {
      label: "Tous les départements",
      value: null
    }
  ];
  Array.prototype.push.apply(all, toOptions(datas, "id", "nom"));
  all.sort(function(a, b) {
    return a.label - b.label;
  });
  return all;
};

export const toOptions = (datas, idKey, labelKey) =>
  datas.map(data => ({
    value: data[idKey],
    label: data[labelKey]
  }));
