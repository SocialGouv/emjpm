const yup = require("yup");

const mesureGroups = [
  "curatelle_renforcee_etablissement",
  "curatelle_renforcee_domicile",
  "curatelle_simple_etablissement",
  "curatelle_simple_domicile",
  "tutelle_etablissement",
  "tutelle_domicile",
  "accompagnement_judiciaire_etablissement",
  "accompagnement_judiciaire_domicile",
  "curatelle_biens_etablissement",
  "curatelle_biens_domicile",
  "curatelle_personne_etablissement",
  "curatelle_personne_domicile",
  "subroge_tuteur_createur_etablissement",
  "subroge_tuteur_createur_domicile",
  "sauvegarde_justice_etablissement",
  "sauvegarde_justice_etablissement",
  "mandat_adhoc_majeur_domicile",
  "mandat_adhoc_majeur_domicile"
];

let attributes = mesureGroups.reduce((acc, mesureGroup) => {
  const debutAnnee = `${mesureGroup}_debut_annee`;
  const finAnnee = `${mesureGroup}_fin_annee`;
  const mesuresNouvelles = `${mesureGroup}_mesures_nouvelles`;
  const sortieMesures = `${mesureGroup}_sortie_mesures`;
  acc[debutAnnee] = yup
    .number()
    .positive()
    .integer();

  acc[mesuresNouvelles] = yup
    .number()
    .positive()
    .integer();
  acc[sortieMesures] = yup
    .number()
    .positive()
    .integer();

  acc[finAnnee] = yup
    .number()
    .positive()
    .integer()
    .test(
      "diff-match",
      "La valeur de fin d'année n'est pas cohérente avec les autres données.",
      function(value) {
        const nbDebutAnnee = this.parent[debutAnnee] | 0;
        const nbSortieMesures = this.parent[sortieMesures] | 0;
        const nbMesuresNouvelles = this.parent[mesuresNouvelles] | 0;
        const expectedFinAnnee =
          nbDebutAnnee + nbSortieMesures - nbMesuresNouvelles;
        return expectedFinAnnee === value;
      }
    );

  return acc;
}, {});

attributes = [
  "revisions_main_levee",
  "revisions_masp",
  "revisions_reconduction",
  "revisions_changement",
  "revisions_autre",
  "sorties_main_levee",
  "sorties_deces",
  "sorties_masp"
].reduce((acc, attrName) => {
  acc[attrName] = yup
    .number()
    .positive()
    .integer();
  return acc;
}, attributes);

const activiteSchema = yup.object(attributes);

module.exports = {
  activiteSchema
};
