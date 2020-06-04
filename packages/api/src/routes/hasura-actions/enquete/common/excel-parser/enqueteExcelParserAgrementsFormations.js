const { ENQ_REP_AGREMENTS_FORMATIONS } = require("../constants");
const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  return {
    // agrements
    debut_activite_avant_2009: parser.boolean(ws["C35"]),
    annee_agrement: parser.integer(ws["C37"], {
      min: 2009,
      max: 2018
    }),
    nb_departements: parser.select(ws["C39"], {
      map: ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.byValue
    }),
    nb_mesures_dep_finance: parser.integer(ws["C41"]),
    nb_mesures_dep_autres: parser.integer(ws["C43"]),
    // formation
    cnc_annee_obtention: parser.integer(ws["B47"]),
    cnc_heures_formation: parser.float(ws["B48"]),
    niveau_qualification: parseNiveauQualification(ws),
    secretaire_specialise_etp_n1: parser.float(ws["B53"], { min: 0 }),
    secretaire_specialise_etp_n2: parser.float(ws["C53"], { min: 0 }),
    secretaire_specialise_etp_n3: parser.float(ws["D53"], { min: 0 }),
    secretaire_specialise_etp_n4: parser.float(ws["E53"], { min: 0 }),
    secretaire_specialise_etp_n5: parser.float(ws["F53"], { min: 0 }),
    secretaire_specialise_etp_n6: parser.float(ws["G53"], { min: 0 })
  };
}

function parseNiveauQualification(ws) {
  return parser.raw(ws["B52"]) != null
    ? 1
    : parser.raw(ws["C52"]) != null
    ? 2
    : parser.raw(ws["D52"]) != null
    ? 3
    : parser.raw(ws["E52"]) != null
    ? 4
    : parser.raw(ws["F52"]) != null
    ? 5
    : parser.raw(ws["G52"]) != null
    ? 6
    : undefined;
}

const enqueteExcelParserAgrementsFormations = {
  parse
};

module.exports = enqueteExcelParserAgrementsFormations;
