var XLSX = require("xlsx");

const parseSheets = ({ base64str, parseOptions }) => {
  const workbook = XLSX.read(base64str, parseOptions);

  return workbook.Sheets.reduce((acc, worksheetName) => {
    const worksheet = workbook.Sheets[worksheetName];
    acc[worksheetName] = worksheet;
    return acc;
  }, {});
};

const parseSheetByIndex = ({ base64str, parseOptions, sheetIndex }) => {
  const workbook = XLSX.read(base64str, parseOptions);

  const worksheetNames = workbook.SheetNames;
  if (sheetIndex < worksheetNames.length) {
    const worksheet = workbook.Sheets[worksheetNames[sheetIndex]];
    return _parseSheetByName(worksheet);
  }
  throw new Error(
    `Invalid sheet index ${sheetIndex} (nb of sheets: ${worksheetNames.length})`
  );
};

function _parseSheetByName(worksheet) {
  return XLSX.utils.sheet_to_json(worksheet, { raw: false }).map(row => {
    return Object.keys(row).reduce((acc, key) => {
      acc[key] = row[key].toString().trim();
      return acc;
    }, {});
  });
}

const excelParser = {
  parseSheets,
  parseSheetByIndex
};

module.exports = excelParser;
