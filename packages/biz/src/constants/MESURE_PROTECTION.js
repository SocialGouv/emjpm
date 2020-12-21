const { buildKeys } = require("../utils/keysBuilder");

const MESURE_PROTECTION = {
  CAUSE_SORTIE: buildKeys({
    caducite: "caducité",
    deces: "décès",
    dessaisissement_autre_mjpm: "dessaisissement en faveur d'un autre MJPM",
    dessaisissement_famille: "dessaisissement en faveur de la famille",
    mainlevee: "mainlevée",
  }),
  CHAMP_MESURE: buildKeys({
    protection_bien: "aux biens",
    protection_bien_personne: "aux biens et à la personne",
    protection_personne: "à la personne",
  }),
  CIVILITE: buildKeys({
    madame: "Madame",
    monsieur: "Monsieur",
  }),
  LIEU_VIE_MAJEUR: buildKeys({
    domicile: "domicile",
    etablissement: "en établissement",
    etablissement_conservation_domicile:
      "en établissement avec conservation du domicile",
    sdf: "SDF",
  }),
  NATURE_MESURE: buildKeys({
    curatelle_renforcee: "curatelle renforcée",
    curatelle_simple: "curatelle simple",
    mandat_protection_future: "mandatat de protection future",
    mesure_accompagnement_judiciaire: "mesure d'accompagnement judiciaire",
    mesure_ad_hoc: "mesure ad'hoc",
    sauvegarde_justice: "sauvegarde de justice",
    subroge_curateur: "subrogé curateur",
    subroge_tuteur: "subrogé tuteur",
    tutelle: "tutelle",
  }),
  RESULTAT_REVISION: buildKeys({
    aggravation: "aggravation",
    allegement: "allègement",
    dessaisissement_autre_mjpm: "dessaisissement en faveur d'autre mjpm",
    dessaisissement_famille: "dessaisissementen faveur de la famille",
    mainlevee: "mainlevée",
    reconduction: "reconduction",
  }),
  SEXE: buildKeys({
    F: "femme",
    H: "homme",
  }),
  STATUS: buildKeys({
    en_attente: "Mesure en attente",
    en_cours: "Mesure en cours",
    eteinte: "Mesure éteinte",
  }),
  TYPE_ETABLISSEMENT: buildKeys({
    autre_etablissement: "Autre établissement",
    autre_etablissement_s_ms: "Autre établissement social ou médico-social",
    etablissement_handicapes: "Etablissement ou service pour handicapés",
    etablissement_hospitalier: "Etablissement hospitalier",
    etablissement_personne_agee: "Etablissement pour personnes agées",
    etablissement_psychiatrique: "Etablissement psychiatrique",
  }),
};

module.exports = { MESURE_PROTECTION };
