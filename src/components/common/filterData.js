const stringMatch = (str, needle) => str.toLowerCase().indexOf(needle.toLowerCase()) !== -1;

const filterData = (data, filters) =>
  data && data.filter(datum => stringMatch(datum[filters.content], filters.filter));

export default filterData;
