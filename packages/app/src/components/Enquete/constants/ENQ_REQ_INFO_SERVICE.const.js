import { enqueteKeysBuilder } from "./enqueteKeysBuilder.service";

export const ENQ_REP_INFO_SERVICE = {
  AFFILIATION_FEDERATION: enqueteKeysBuilder.buildKeys({
    autre: "Autres Fédérations",
    cnape: "CNAPE",
    fnat: "FNAT",
    none: "Aucune Fédération ",
    unaf: "UNAF",
    unapei: "UNAPEI",
  }),

  TYPE_ORGANISME_GESTIONNAIRE: enqueteKeysBuilder.buildKeys({
    association: "Association",
    autres: "Autres",
    ccas: "CCAS",
    organisme_securite_sociale: "Organisme de sécurité sociale",
  }),
};
