import { NullableNumber } from "../utils/types.util";

export interface Tis {
  id: number;
  etablissement: string;
  email: string;
  code_postal: string;
  ville: string;
  telephone: string;
  latitude: number;
  longitude: number;
  created_at: Date;
  user_id: NullableNumber;
}
