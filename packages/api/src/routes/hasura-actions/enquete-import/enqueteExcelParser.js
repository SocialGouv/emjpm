var XLSX = require("xlsx");

const parse = ({ base64str }) => {
  const workbook = XLSX.read(base64str, {
    cellDates: true,
    dateNF: "dd/mm/yyyy",
    locale: "fr-FR",
    type: "base64",
    raw: false
  });

  const worksheet = workbook.Sheets["info mandataire-exerc. activité"];
  if (worksheet) {
    console.log("test");
    console.log("test:", worksheet["A2"]);
  }

  return [];
};

const enqueteExcelParser = {
  parse
};

module.exports = enqueteExcelParser;
