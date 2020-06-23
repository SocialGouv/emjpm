const yup = require("yup");

function buildMesureGroupsAttributes(mesureGroups) {
  const attributes = mesureGroups.reduce((acc, mesureGroup) => {
    const debutAnnee = `${mesureGroup}_debut_annee`;
    const finAnnee = `${mesureGroup}_fin_annee`;
    const mesuresNouvelles = `${mesureGroup}_mesures_nouvelles`;
    const sortieMesures = `${mesureGroup}_sortie_mesures`;

    acc[debutAnnee] = yup.number().min(0).integer().nullable();
    acc[mesuresNouvelles] = yup.number().min(0).integer().nullable();
    acc[sortieMesures] = yup.number().min(0).integer().nullable();
    acc[finAnnee] = yup.number().min(0).integer().nullable();

    return acc;
  }, {});
  return attributes;
}

module.exports = {
  buildMesureGroupsAttributes,
};
