const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  return {
    aah: parser.integer(ws["D7"]),
    pch: parser.integer(ws["D8"]),
    asi: parser.integer(ws["D9"]),
    rsa: parser.integer(ws["D10"]),
    als_apl: parser.integer(ws["D11"]),
    aspa: parser.integer(ws["D12"]),
    apa: parser.integer(ws["D13"]),
  };
}

const enqueteExcelParserPrestationsSociales = {
  parse,
};

module.exports = enqueteExcelParserPrestationsSociales;
