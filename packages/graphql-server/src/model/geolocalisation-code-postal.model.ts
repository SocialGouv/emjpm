import { NullableNumber, NullableString } from "../types";

export interface GeolocalisationCodePostal {
  id: number;
  code_postal: NullableString;
  latitude: NullableNumber;
  longitude: NullableNumber;
  city: string | null;
}
