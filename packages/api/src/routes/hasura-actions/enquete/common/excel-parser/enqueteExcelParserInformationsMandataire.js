const { ENQ_REP_INFO_MANDATAIRE } = require("../constants");
const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  return {
    anciennete: parser.select(ws["C17"], {
      map: ENQ_REP_INFO_MANDATAIRE.ANCIENNETE.byValue,
    }),
    benevole: parser.boolean(ws["B11"]),
    departement: parser.string(ws["B2"]),
    estimation_etp: parser.select(ws["B25"], {
      map: ENQ_REP_INFO_MANDATAIRE.ESTIMATION_ETP.byValue,
    }),
    exerce_secretaires_specialises: parser.boolean(ws["B27"]),
    exerce_seul_activite: parser.boolean(ws["B23"]),
    forme_juridique: parser.select(ws["B13"], {
      map: ENQ_REP_INFO_MANDATAIRE.FORME_JURIDIQUE.byValue,
    }),
    local_professionnel: parser.boolean(ws["D31"]),
    nom: parser.string(ws["B4"]),
    region: parser.string(ws["B3"]),
    secretaire_specialise_etp: parser.float(ws["D28"], {
      min: 0,
    }),
    sexe: parser.select(ws["C15"], {
      map: ENQ_REP_INFO_MANDATAIRE.SEXE.byValue,
    }),
    tranche_age: parser.select(ws["C19"], {
      map: ENQ_REP_INFO_MANDATAIRE.TRANCHE_AGE.byValue,
    }),
  };
}
const enqueteExcelParserInformationsMandataire = {
  parse,
};

module.exports = enqueteExcelParserInformationsMandataire;
