import { NullableDate, NullableNumber, NullableString } from "../types";

export type MesureStatus =
  | "en_cours"
  | "en_attente"
  | "eteinte"
  | null;

// TODO(tglatt): use constants from @emjpm/core
export type MesureNature =
  | "curatelle_renforcee"
  | "curatelle_simple"
  | "mandat_protection_future"
  | "mesure_accompagnement_judiciaire"
  | "mesure_ad_hoc"
  | "sauvegarde_justice"
  | "subroge_curateur"
  | "subroge_tuteur"
  | "tutelle"
  | null;

// TODO(tglatt): use constants from @emjpm/core
export type ChampProtection =
  | "protection_bien"
  | "protection_personne"
  | "protection_bien_personne"
  | null;

// TODO(tglatt): use constants from @emjpm/core
export type MesureLieuVie =
  | "domicile"
  | "etablissement"
  | "etablissement_conservation_domicile"
  | "sdf"
  | null;

// TODO(tglatt): use constants from @emjpm/core
export type Civilite = "madame" | "monsieur" | null;

// TODO(tglatt): use constants from @emjpm/core
export type MesureCauseSortie =
  | "caducite"
  | "deces"
  | "dessaisissement_autre_mjpm"
  | "dessaisissement_famille"
  | "mainlevee"
  | null;

export interface Mesures {
  id: number;
  ville: NullableString;
  etablissement: NullableString;
  mandataire_id: NullableNumber;
  created_at: NullableDate;
  annee_naissance: NullableString;
  nature_mesure: MesureNature;
  champ_protection: ChampProtection;
  date_nomination: NullableDate;
  lieu_vie: MesureLieuVie;
  civilite: Civilite;
  status: MesureStatus;
  date_fin_mesure: NullableDate;
  etablissement_id: NullableNumber;
  ti_id: NullableNumber;
  cabinet: NullableString;
  numero_dossier: NullableString;
  cause_sortie: MesureCauseSortie;
  numero_rg: NullableString;
}
