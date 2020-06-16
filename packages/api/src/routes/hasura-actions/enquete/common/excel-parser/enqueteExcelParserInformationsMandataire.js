const { ENQ_REP_INFO_MANDATAIRE } = require("../constants");
const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  return {
    departement: parser.string(ws["B2"]),
    region: parser.string(ws["B3"]),
    nom: parser.string(ws["B4"]),
    benevole: parser.boolean(ws["B11"]),
    forme_juridique: parser.select(ws["B13"], {
      map: ENQ_REP_INFO_MANDATAIRE.FORME_JURIDIQUE.byValue,
    }),
    sexe: parser.select(ws["C15"], {
      map: ENQ_REP_INFO_MANDATAIRE.SEXE.byValue,
    }),
    anciennete: parser.select(ws["C17"], {
      map: ENQ_REP_INFO_MANDATAIRE.ANCIENNETE.byValue,
    }),
    tranche_age: parser.select(ws["C19"], {
      map: ENQ_REP_INFO_MANDATAIRE.TRANCHE_AGE.byValue,
    }),
    exerce_seul_activite: parser.boolean(ws["B23"]),
    estimation_etp: parser.select(ws["B25"], {
      map: ENQ_REP_INFO_MANDATAIRE.ESTIMATION_ETP.byValue,
    }),
    exerce_secretaires_specialises: parser.boolean(ws["B27"]),
    secretaire_specialise_etp: parser.float(ws["D28"], {
      min: 0,
    }),
    local_professionnel: parser.boolean(ws["D31"]),
  };
}
const enqueteExcelParserInformationsMandataire = {
  parse,
};

module.exports = enqueteExcelParserInformationsMandataire;
