var XLSX = require("xlsx");

function convertExcelFileToJson(file) {
  var workbook = XLSX.readFile(file);
  console.log(workbook);

  const [, secondTabName] = workbook.SheetNames;
  return parseSecondTab(workbook.Sheets[secondTabName]);
}

function getCellValue(worksheet, cell) {
  return worksheet[cell] ? worksheet[cell].v : "";
}

function parseSecondTab(worksheet) {
  if (!worksheet) {
    throw "Require worksheet";
  }

  const departement = getCellValue(worksheet, "B2");
  const region = getCellValue(worksheet, "B3");
  const mandataire = getCellValue(worksheet, "B4");
  const benevole = getCellValue(worksheet, "B11") === "Oui";

  return {
    data: JSON.stringify({ departement, region, mandataire, benevole })
  };
}

module.exports = { convertExcelFileToJson };
