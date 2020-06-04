var XLSX = require("xlsx");

const parseSheets = ({ content, parseOptions }) => {
  const workbook = XLSX.read(content, parseOptions);

  return workbook.Sheets.reduce((acc, worksheetName) => {
    const worksheet = workbook.Sheets[worksheetName];
    acc[worksheetName] = worksheet;
    return acc;
  }, {});
};

// https://github.com/SheetJS/sheetjs/issues/764
function update_sheet_range(ws) {
  var range = { s: { r: 20000000, c: 20000000 }, e: { r: 0, c: 0 } };
  Object.keys(ws)
    .filter(function(x) {
      return x.charAt(0) != "!";
    })
    .map(XLSX.utils.decode_cell)
    .forEach(function(x) {
      range.s.c = Math.min(range.s.c, x.c);
      range.s.r = Math.min(range.s.r, x.r);
      range.e.c = Math.max(range.e.c, x.c);
      range.e.r = Math.max(range.e.r, x.r);
    });
  ws["!ref"] = XLSX.utils.encode_range(range);
}

const parseSheetByIndex = ({ content, parseOptions, sheetIndex }) => {
  const workbook = XLSX.read(content, parseOptions);
  const worksheetNames = workbook.SheetNames;
  if (sheetIndex < worksheetNames.length) {
    const worksheet = workbook.Sheets[worksheetNames[sheetIndex]];
    update_sheet_range(worksheet);
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
