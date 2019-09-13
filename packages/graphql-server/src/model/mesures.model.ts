import {
  NullableDate,
  NullableNumber,
  NullableString
} from "../utils/types.util";

export type MesureStatus =
  | "Mesure en cours"
  | "Mesure en attente"
  | "Eteindre mesure"
  | null;

export type MesureType =
  | "Curatelle"
  | "curatelle renforcée"
  | "Curatelle renforcée"
  | "Curatelle renforcée à la personne"
  | "Curatelle renforcée aux biens"
  | "Curatelle renforcée aux biens et à la personne"
  | "Curatelle simple"
  | "Curatelle simple à la personne"
  | "Curatelle simple aux biens"
  | "Curatelle simple à la personne"
  | "Curatelle simple aux biens et à la personne"
  | "MAJ"
  | "Mandat de protection future"
  | "Mesure ad hoc"
  | "Sauvegarde de justice"
  | "Sauvegarde de justice avec mandat spécial"
  | "Subrogé curateur"
  | "Subrogé tuteur"
  | "Tutelle"
  | "Tutelle à la personne"
  | "Tutelle aux biens"
  | "Tutelle aux biens et à la personne"
  | null;

export type MesureResidence =
  | "A Domicile"
  | "En établissement"
  | "En établissement avec conservation du domicile"
  | "SDF"
  | "Autres"
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
