// const { ENQ_REP_INFO_MANDATAIRE } = require("../constants");
const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  return {
    departement: parser.string(ws["B1"]),
    region: parser.string(ws["B2"]),
    nom: parser.string(ws["B3"]),
  };
}

module.exports = {
  parse,
};
