// constantes synchronisées avec le fichier app/ENQ_REP_INFO_MANDATAIRE_FORM.const.js
const ENQ_REP_INFO_MANDATAIRE = {
  ANCIENNETE: buildKeys({
    "0-2": "Moins de 2 ans",
    "2-5": "2 ans à moins de 5 ans",
    "5-10": "5 ans à moins de 10 ans",
    "10-20": "10 ans à moins de 20 ans",
    "20-30": "20 ans à moins de 30 ans",
    "30+": "30 ans et plus"
  }),
  FORME_JURIDIQUE: buildKeys({
    EI: "Entreprise individuelle",
    EURL: "EURL",
    SARL: "SARL",
    SCOP: "SCOP",
    SA: "SA",
    SAS: "SAS",
    SNC: "SNC",
    SEL: "SEL",
    SCP: "SCP"
  }),
  ESTIMATION_ETP: buildKeys({
    "0-30": "jusqu'à 30% d'un ETP",
    "30-50": "supérieure à 30% jusqu'à 50%",
    "50-70": "supérieure à 50% jusqu'à 70%",
    "70-90": "supérieure à 70% jusqu'à 90%",
    "90-100": "A temps plein"
  }),
  TRANCHE_AGE: buildKeys({
    "0-25": "Inférieur à 25 ans",
    "25-35": "25 ans à moins de 35 ans",
    "35-50": "35 ans à moins de 50 ans",
    "50-65": "50 ans à moins de 65 ans",
    "65+": "Plus de 65 ans"
  }),
  SEXE: buildKeys({
    H: "Homme",
    F: "Femme"
  })
};

module.exports = {
  ENQ_REP_INFO_MANDATAIRE
};

function buildKeys(byKey) {
  return {
    byKey,
    byValue: revertMapKeysValues(byKey)
  };
}

function revertMapKeysValues(mapByKey) {
  return Object.keys(mapByKey).reduce((map, key) => {
    const value = mapByKey[key];
    map[value] = key;
    return map;
  }, {});
}
