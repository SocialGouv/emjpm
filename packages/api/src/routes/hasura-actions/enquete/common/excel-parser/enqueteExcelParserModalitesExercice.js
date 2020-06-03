const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  return {
    departement: parser.string(ws["B1"]),
    region: parser.string(ws["B2"]),
    raison_sociale: parser.string(ws["B3"]),
    personnalite_juridique_etablissement: "",
    activite_personne_physique: parser.integer(ws["C13"]),
    activite_service: parser.integer(ws["C15"]),
    etablissement_personne_morale: parser.integer(ws["E18"]),
    etablissement_convention_groupement: parser.integer(ws["E20"]),
    nombre_etablissements: parser.integer(ws["B22"]),
    total_mesures_etablissements: parser.integer(ws["E22"]),
    nombre_lits_journee_hospitalisation: {},
    actions_information_tuteurs_familiaux: parser.integer(ws["E52"])
  };
}

module.exports = {
  parse
};
