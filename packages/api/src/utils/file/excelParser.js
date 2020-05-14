var XLSX = require("xlsx");

const toJson = ({ base64str, type }) => {
  const workbook = XLSX.read(base64str, {
    cellDates: true,
    dateNF: "dd/mm/yyyy",
    locale: "fr-FR",
    type: "base64",
    raw: type === "csv" ? true : false
  });

  const [worksheetName] = workbook.SheetNames;
  const worksheet = workbook.Sheets[worksheetName];

  return XLSX.utils.sheet_to_json(worksheet, { raw: false }).map(row => {
    return Object.keys(row).reduce((acc, key) => {
      acc[key] = row[key].toString().trim();

      return acc;
    }, {});
  });
};

const excelParser = {
  toJson
};

module.exports = excelParser;
