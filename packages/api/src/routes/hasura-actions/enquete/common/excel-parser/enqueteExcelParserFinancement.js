const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  return {
    charges_personnel: parser.float(ws["B6"], { min: 0 }),
    charges_preposes: parser.float(ws["B7"], { min: 0 }),
    charges_fonctionnement: parser.float(ws["B8"], { min: 0 }),
    produits_bareme_prelevements: parser.float(ws["D6"], { min: 0 }),
    autre_produits: parser.float(ws["D7"], { min: 0 }),
    financement_public: parser.float(ws["D8"], { min: 0 }),
    aide_sociale_conseil_departemental: parser.float(ws["D9"], { min: 0 })
  };
}

const enqueteExcelParserFinancement = {
  parse
};

module.exports = enqueteExcelParserFinancement;
