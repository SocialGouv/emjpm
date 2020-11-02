const { ENQ_REP_MODALITE_EXERCICE } = require("../constants");
const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  const nombre_lits_journee_hospitalisation = [];
  for (var i = 29; i <= 48; ++i) {
    const finess = parser.string(ws[`A${i}`]);
    const raison_sociale = parser.string(ws[`B${i}`]);
    const statut = parser.select(ws[`C${i}`], {
      map: ENQ_REP_MODALITE_EXERCICE.STATUT_ETABLISSEMENT.byValue,
    });
    const type = parser.select(ws[`D${i}`], {
      map: ENQ_REP_MODALITE_EXERCICE.TYPE_ETABLISSEMENT.byValue,
    });
    const nombre_lits = parser.integer(ws[`E${i}`]);
    const nombre_journees_hospitalisation = parser.integer(ws[`F${i}`]);
    const nombre_mesures = parser.integer(ws[`G${i}`]);
    const nombre_journees_esms = parser.integer(ws[`H${i}`]);

    if (
      !!finess ||
      !!raison_sociale ||
      !!statut ||
      !!type ||
      !!nombre_lits ||
      !!nombre_journees_hospitalisation ||
      !!nombre_mesures ||
      !!nombre_journees_esms
    ) {
      nombre_lits_journee_hospitalisation.push({
        finess,
        nombre_journees_esms,
        nombre_journees_hospitalisation,
        nombre_lits,
        nombre_mesures,
        raison_sociale,
        statut,
        type,
      });
    }
  }

  return {
    actions_information_tuteurs_familiaux: parser.integerAsBoolean(ws["E52"]),
    activite_exercee_par:
      parser.integer(ws["C13"]) === 1
        ? "personne-physique"
        : parser.integer(ws["C15"]) === 1
        ? "service"
        : undefined,
    departement: parser.string(ws["B1"]),
    etablissements_type:
      parser.integer(ws["E18"]) === 1
        ? "personne-morale"
        : parser.integer(ws["E20"]) === 1
        ? "convention-groupement"
        : undefined,
    nombre_lits_journee_hospitalisation: JSON.stringify(
      nombre_lits_journee_hospitalisation
    ),
    personnalite_juridique_etablissement: parser.select(ws["E8"], {
      map: ENQ_REP_MODALITE_EXERCICE.PERSONNALITE_JURIDIQUE.byValue,
    }),
    raison_sociale: parser.string(ws["B3"]),
    region: parser.string(ws["B2"]),
    total_mesures_etablissements: parser.integer(ws["E22"]),
  };
}

module.exports = {
  parse,
};
