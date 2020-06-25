import { enqueteKeysBuilder } from "./enqueteKeysBuilder.service";

export const ENQ_REP_INFO_SERVICE = {
  AFFILIATION_FEDERATION: enqueteKeysBuilder.buildKeys({
    unaf: "UNAF",
    unapei: "UNAPEI",
    fnat: "FNAT",
    cnape: "CNAPE",
    autre: "Autres Fédérations",
    none: "Aucune Fédération ",
  }),

  TYPE_ORGANISME_GESTIONNAIRE: enqueteKeysBuilder.buildKeys({
    association: "Association",
    ccas: "CCAS",
    organisme_securite_sociale: "Organisme de sécurité sociale",
    autres: "Autres",
  }),
};
