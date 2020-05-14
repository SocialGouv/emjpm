import { NullableDate, NullableNumber, NullableString } from "../types";

export type MesureStatus =
  | "Mesure en cours"
  | "Mesure en attente"
  | "Eteindre mesure"
  | null;

export type MesureType =
  | "curatelle"
  | "curatelle renforcée"
  | "curatelle renforcée"
  | "curatelle renforcée à la personne"
  | "curatelle renforcée aux biens"
  | "curatelle renforcée aux biens et à la personne"
  | "curatelle simple"
  | "curatelle simple à la personne"
  | "curatelle simple aux biens"
  | "curatelle simple à la personne"
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

export type MesureResidence =
  | "domicile"
  | "en établissement"
  | "en établissement avec conservation du domicile"
  | "sdf"
  | "autres"
  | null;

export interface Mesures {
  id: number;
  ville: NullableString;
  etablissement: NullableString;
  mandataire_id: NullableNumber;
  created_at: NullableDate;
  annee: NullableString;
  type: MesureType;
  date_ouverture: NullableDate;
  residence: MesureResidence;
  civilite: NullableString;
  status: MesureStatus;
  extinction: NullableDate;
  etablissement_id: NullableNumber;
  ti_id: NullableNumber;
  cabinet: NullableString;
  numero_dossier: NullableString;
  reason_extinction: NullableString;
  numero_rg: NullableString;
}
