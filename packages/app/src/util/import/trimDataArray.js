export default dataArray => {
  return dataArray.map(data => {
    return Object.keys(data).map(k => {
      return (data[k] = typeof data[k] == "string" ? data[k].trim() : data[k]);
    });
  });
};
