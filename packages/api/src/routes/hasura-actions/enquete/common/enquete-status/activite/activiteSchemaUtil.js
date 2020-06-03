const yup = require("yup");

function buildMesureGroupsAttributes(mesureGroups) {
  const attributes = mesureGroups.reduce((acc, mesureGroup) => {
    const debutAnnee = `${mesureGroup}_debut_annee`;
    const finAnnee = `${mesureGroup}_fin_annee`;
    const mesuresNouvelles = `${mesureGroup}_mesures_nouvelles`;
    const sortieMesures = `${mesureGroup}_sortie_mesures`;
    acc[debutAnnee] = yup
      .number()
      .min(0)
      .integer()
      .nullable();

    acc[mesuresNouvelles] = yup
      .number()
      .min(0)
      .integer()
      .nullable();
    acc[sortieMesures] = yup
      .number()
      .min(0)
      .integer()
      .nullable();

    acc[finAnnee] = yup
      .number()
      .min(0)
      .integer()
      .test(
        "diff-match",
        "La valeur de fin d'année n'est pas cohérente avec les autres données.",
        function(value) {
          const nbDebutAnnee = this.parent[debutAnnee] | 0;
          const nbSortieMesures = this.parent[sortieMesures] | 0;
          const nbMesuresNouvelles = this.parent[mesuresNouvelles] | 0;
          const expectedFinAnnee =
            nbDebutAnnee + nbMesuresNouvelles - nbSortieMesures;
          value = value | 0;

          if (expectedFinAnnee !== value) {
            console.log("xxx  expectedFinAnnee: ", expectedFinAnnee);
            console.log("xxx  value: ", value);
          }

          return expectedFinAnnee === value;
        }
      );

    return acc;
  }, {});
  return attributes;
}

module.exports = {
  buildMesureGroupsAttributes
};
