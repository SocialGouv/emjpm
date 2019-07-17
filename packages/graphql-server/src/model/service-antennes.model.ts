import {
  NullableDate,
  NullableNumber,
  NullableString
} from "../utils/types.util";

export interface ServiceAntennes {
  id: number;
  etablissement: NullableString;
  poste: NullableString;
  email: NullableString;
  type: NullableString;
  code_postal: NullableString;
  ville: NullableString;
  telephone: NullableString;
  adresse: NullableString;
  mesures_en_cours: NullableNumber;
  dispo_max: NullableNumber;
  telephone_portable: NullableString;
  nom: NullableString;
  prenom: NullableString;
  mandataire_id: NullableNumber;
  created_at: NullableDate;
}
