import { NullableDate, NullableNumber, NullableString } from "../types";

export type MesureStatus =
  | "Mesure en cours"
  | "Mesure en attente"
  | "Eteindre mesure"
  | null;

export type MesureType =
  | "curatelle"
  | "curatelle renforcée"
  | "curatelle renforcée à la personne"
  | "curatelle renforcée aux biens"
  | "curatelle renforcée aux biens et à la personne"
  | "curatelle simple"
  | "curatelle simple à la personne"
  | "curatelle simple aux biens"
  | "curatelle simple aux biens et à la personne"
  | "maj"
  | "mandat de protection future"
  | "mesure ad hoc"
  | "sauvegarde de justice"
  | "sauvegarde de justice avec mandat spécial"
  | "subrogé curateur"
  | "subrogé tuteur"
  | "tutelle"
  | "tutelle à la personne"
  | "tutelle aux biens"
  | "tutelle aux biens et à la personne"
  | null;

export type MesureLieuVie =
  | "domicile"
  | "etablissement"
  | "etablissement_conservation_domicile"
  | "sdf"
  | null;

export type Civilite = "madame" | "monsieur" | null;

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
  type: MesureType;
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
