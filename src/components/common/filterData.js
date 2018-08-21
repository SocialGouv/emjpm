const sortByDispo = (a, b) => {
  const dispoA = parseFloat(a) || -Infinity;
  const dispoB = parseFloat(b) || -Infinity;
  if (dispoA < dispoB) {
    return -1;
  }
  if (dispoA > dispoB) {
    return 1;
  }
  return 0;
};

const sortMandataires = (a, b) =>
  sortByDispo(a.mesures_en_cours / a.dispo_max, b.mesures_en_cours / b.dispo_max);

const stringMatch = (str, needle) => {
  return str.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
};

const filterData = (data, filters) => {
  let filteredMesures =
    data &&
    data.filter(datum => {
      return stringMatch(datum[filters.content], filters.filter);
    });
  return filteredMesures.sort(sortMandataires);
};

export default filterData;
