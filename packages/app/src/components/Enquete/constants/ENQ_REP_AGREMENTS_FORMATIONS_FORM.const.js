import { enqueteKeysBuilder } from "./enqueteKeysBuilder.service";

export const ENQ_REP_AGREMENTS_FORMATIONS_FORM = {
  NB_DEPARTEMENTS: enqueteKeysBuilder.buildKeys({
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5+": "Plus de 5"
  })
};
