import { NullableNumber, NullableString } from "../utils/types.util";

export interface GeolocalisationCodePostal {
  id: number;
  code_postal: NullableString;
  latitude: NullableNumber;
  longitude: NullableNumber;
  city: string | null;
}
