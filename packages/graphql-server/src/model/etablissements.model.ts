import { NullableNumber, NullableString } from "../types";

export interface Etablissements {
  id: number;
  id_finess: NullableString;
  nom: string;
  adresse: NullableString;
  code_postal: NullableString;
  ville: NullableString;
  tel: NullableString;
  fax: NullableString;
  latitude: NullableNumber;
  longitude: NullableNumber;
}
