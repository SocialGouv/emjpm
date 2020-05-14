var XLSX = require("xlsx");

const toJson = ({ base64str, type }) => {
  const workbook = XLSX.read(base64str, {
    type: "base64"
  });

  const [worksheetName] = workbook.SheetNames;
  const worksheet = workbook.Sheets[worksheetName];

  return XLSX.utils.sheet_to_json(worksheet, { raw: true }).map(row => {
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
