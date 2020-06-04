import { enqueteKeysBuilder } from "./enqueteKeysBuilder.service";

// constantes synchronisées avec le fichier api/ENQ_REP_AGREMENTS_FORMATIONS.const.js
export const ENQ_REP_AGREMENTS_FORMATIONS = {
  NB_DEPARTEMENTS: enqueteKeysBuilder.buildKeys({
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5+": "Plus de 5"
  })
};
