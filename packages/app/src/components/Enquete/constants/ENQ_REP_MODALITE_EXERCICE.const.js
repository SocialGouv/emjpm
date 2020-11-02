import { enqueteKeysBuilder } from "./enqueteKeysBuilder.service";

export const ENQ_REP_MODALITE_EXERCICE = {
  ACTIVE_EXERCEE_PAR: enqueteKeysBuilder.buildKeys({
    "personne-physique": "Une personne physique",
    service: "Un service au sens de l'article L312-1 du CASF",
  }),
  ETABLISSEMENTS_TYPE: enqueteKeysBuilder.buildKeys({
    "convention-groupement":
      "Plusieurs établissements dans le cadre d'une convention ou d'un groupement (SIH, GCS, GCSMS, GIP).",
    "personne-morale":
      "Un ou plusieurs établissements dépendant de la même personne morale.",
  }),
};
