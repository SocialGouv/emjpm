import {
  NullableDate,
  NullableNumber,
  NullableString
} from "../utils/types.util";

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
  secretariat: boolean | null;
  nb_secretariat: NullableNumber;
  created_at: NullableDate;
  date_mesure_update: NullableDate;
  email_send: NullableDate;
  genre: NullableString;
  mesures_en_attente: NullableNumber;
  zip: NullableString;
  service_id: NullableNumber;
  contact_email: NullableString;
  contact_nom: NullableString;
  contact_prenom: NullableString;
}
