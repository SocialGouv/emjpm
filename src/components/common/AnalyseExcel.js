// Begining of analyse Excel: Not use for now

const analyseExel = (data, defaultColumns = [], colums) => {
  const allColumnsPresent = defaultColumns.filter(col => colums.indexOf(col) === -1);
  return new Promise(
    (resolve, reject) => (allColumnsPresent.length !== 0 ? resolve(allColumnsPresent) : "")
  );
};

export default analyseExel;
