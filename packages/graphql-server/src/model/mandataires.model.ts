import { NullableDate, NullableNumber, NullableString } from "../types";

export interface Mandataires {
  id: number;
  etablissement: string;
  code_postal: string;
  ville: string;
  telephone: string;
  adresse: string;
  mesures_en_cours: NullableNumber;
  dispo_max: NullableNumber;
  user_id: NullableNumber;
  telephone_portable: NullableString;
  created_at: NullableDate;
  date_mesure_update: NullableDate;
  email_send: NullableDate;
  genre: NullableString;
  mesures_en_attente: NullableNumber;
  zip: NullableString;
  antenne_id: NullableNumber;
}
