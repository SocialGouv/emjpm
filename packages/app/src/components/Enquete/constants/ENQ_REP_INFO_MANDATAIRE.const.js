import { enqueteKeysBuilder } from "./enqueteKeysBuilder.service";

// constantes synchronisées avec le fichier api/ENQ_REP_INFO_MANDATAIRE.const.js
export const ENQ_REP_INFO_MANDATAIRE = {
  ANCIENNETE: enqueteKeysBuilder.buildKeys({
    "0-2": "Moins de 2 ans",
    "10-20": "10 ans à moins de 20 ans",
    "2-5": "2 ans à moins de 5 ans",
    "20-30": "20 ans à moins de 30 ans",
    "30+": "30 ans et plus",
    "5-10": "5 ans à moins de 10 ans"
  }),
  ESTIMATION_ETP: enqueteKeysBuilder.buildKeys({
    "0-30": "jusqu'à 30% d'un ETP",
    "30-50": "supérieure à 30% jusqu'à 50%",
    "50-70": "supérieure à 50% jusqu'à 70%",
    "70-90": "supérieure à 70% jusqu'à 90%",
    "90-100": "A temps plein"
  }),

  FORME_JURIDIQUE: enqueteKeysBuilder.buildKeys({
    EI: "Entreprise individuelle",
    EURL: "EURL",
    SA: "SA",
    SARL: "SARL",
    SAS: "SAS",
    SCOP: "SCOP",
    SCP: "SCP",
    SEL: "SEL",
    SNC: "SNC"
  }),
  SEXE: enqueteKeysBuilder.buildKeys({
    F: "Femme",
    H: "Homme"
  }),
  TRANCHE_AGE: enqueteKeysBuilder.buildKeys({
    "0-25": "Inférieur à 25 ans",
    "25-35": "25 ans à moins de 35 ans",
    "35-50": "35 ans à moins de 50 ans",
    "50-65": "50 ans à moins de 65 ans",
    "65+": "Plus de 65 ans"
  })
};
