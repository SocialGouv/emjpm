const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  return {
    aah: parser.integer(ws["D7"]),
    als_apl: parser.integer(ws["D11"]),
    apa: parser.integer(ws["D13"]),
    asi: parser.integer(ws["D9"]),
    aspa: parser.integer(ws["D12"]),
    pch: parser.integer(ws["D8"]),
    rsa: parser.integer(ws["D10"]),
  };
}

const enqueteExcelParserPrestationsSociales = {
  parse,
};

module.exports = enqueteExcelParserPrestationsSociales;
