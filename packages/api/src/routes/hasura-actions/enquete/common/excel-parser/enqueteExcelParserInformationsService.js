const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  const result = {
    departement: parser.string(ws["B1"]),
    region: parser.string(ws["B2"]),
    nom: parser.string(ws["B3"]),
  };

  if (parser.integer(ws["C9"]) === 1) {
    result.type_organisme_gestionnaire = "association";
  } else if (parser.integer(ws["C10"]) === 1) {
    result.type_organisme_gestionnaire = "ccas";
  } else if (parser.integer(ws["C11"]) === 1) {
    result.type_organisme_gestionnaire = "organisme_securite_sociale";
  } else if (parser.integer(ws["C12"]) === 1) {
    result.type_organisme_gestionnaire = "autres";
  }

  if (parser.integer(ws["C17"]) === 1) {
    result.nb_structures_concernees = parser.integer(ws["C19"]);
  }

  if (parser.integer(ws["C25"]) === 1) {
    result.affiliation_federation = "unaf";
  } else if (parser.integer(ws["C26"]) === 1) {
    result.affiliation_federation = "unapei";
  } else if (parser.integer(ws["C27"]) === 1) {
    result.affiliation_federation = "fnat";
  } else if (parser.integer(ws["C28"]) === 1) {
    result.affiliation_federation = "cnape";
  } else if (parser.integer(ws["C29"]) === 1) {
    result.affiliation_federation = "autre";
  } else if (parser.integer(ws["C30"]) === 1) {
    result.affiliation_federation = "none";
  }

  return result;
}

module.exports = {
  parse,
};
