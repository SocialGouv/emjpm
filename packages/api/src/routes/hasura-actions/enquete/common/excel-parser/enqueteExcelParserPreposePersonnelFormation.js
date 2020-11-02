const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  return {
    formation_preposes_mjpm: {
      en_poste_cnc: parse_nb_preposes_heures_formation(ws, 11),
      formation_non_cnc: parse_nb_preposes_heures_formation(ws, 12),
      non_formation_non_cnc: parse_nb_preposes_heures_formation(ws, 13),
    },
    nb_autre_personnel: parser.integer(ws["C39"]),
    nb_autre_personnel_etp: parser.float(ws["D39"]),
    nb_preposes_femme: parser.integer(ws["C33"]),
    nb_preposes_homme: parser.integer(ws["C32"]),
    nb_preposes_mjpm: parser.integer(ws["C7"]),
    nb_preposes_mjpm_etp: parser.integer(ws["D7"]),
    niveaux_qualification: {
      n1: parse_nb_preposes_nb_preposes_etp(ws, 21),
      n2: parse_nb_preposes_nb_preposes_etp(ws, 22),
      n3: parse_nb_preposes_nb_preposes_etp(ws, 23),
      n4: parse_nb_preposes_nb_preposes_etp(ws, 24),
      n5: parse_nb_preposes_nb_preposes_etp(ws, 25),
      n6: parse_nb_preposes_nb_preposes_etp(ws, 26),
    },
  };
}
const enqueteExcelParserInformationsMandataire = {
  parse,
};

module.exports = enqueteExcelParserInformationsMandataire;

function parse_nb_preposes_heures_formation(ws, line) {
  return {
    heures_formation: parser.integer(ws[`D${line}`], { min: 0 }),
    nb_preposes: parser.integer(ws[`C${line}`], { min: 0 }),
  };
}
function parse_nb_preposes_nb_preposes_etp(ws, line) {
  return {
    nb_preposes: parser.integer(ws[`C${line}`], { min: 0 }),
    nb_preposes_etp: parser.float(ws[`D${line}`], { min: 0 }),
  };
}
