import { buildKeys } from './keysBuilder.service';

export const MESURE_PROTECTION = {
  CAUSE_SORTIE: buildKeys({
    caducite: 'caducité',
    deces: 'décès',
    dessaisissement_autre_mjpm: "dessaisissement en faveur d'un autre MJPM",
    dessaisissement_famille: 'dessaisissement en faveur de la famille',
    mainlevee: 'mainlevée',
  }),

  CHAMP_MESURE: buildKeys({
    protection_bien: 'protection aux biens',
    protection_bien_personne: 'protection aux biens et à la personne',
    protection_personne: 'protection à la personne',
  }),

  LIEU_VIE_MAJEUR: buildKeys({
    domicile: 'domicile',
    etablissement: 'en établissement',
    etablissement_conservation_domicile: 'en établissement avec conservation du domicile',
    sdf: 'SDF',
  }),

  NATURE_MESURE: buildKeys({
    curatelle_renforcee: 'curatelle renforcée',
    curatelle_simple: 'curatelle simple',
    mandat_protection_future: 'mandatat de protection future',
    mesure_accompagnement_judiciaire: "mesure d'accompagnement judiciaire",
    mesure_ad_hoc: "mesure ad'hoc",
    sauvegarde_justice: 'sauvegarde de justice',
    subroge_curateur: 'subrogé curateur',
    subroge_tuteur: 'subrogé tuteur',
    tutelle: 'tutelle',
  }),

  RESULTAT_REVISION: buildKeys({
    aggravation: 'aggravation',
    allegement: 'allègement',
    dessaisissement_autre_mjpm: "dessaisissement en faveur d'autre_mjpm",
    dessaisissement_famille: 'dessaisissementen faveur de la famille',
    mainlevee: 'mainlevée',
    reconduction: 'reconduction',
  }),

  SEXE: buildKeys({
    F: 'femme',
    H: 'homme',
  }),
};
