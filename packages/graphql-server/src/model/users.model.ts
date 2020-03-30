import { NullableDate, NullableNumber, NullableString } from "../types";

export interface Users {
  id: number;
  username: string;
  password: string;
  created_at: Date;
  type: NullableString;
  last_login: NullableDate;
  active: NullableNumber;
  reset_password_token: NullableString;
  reset_password_expires: NullableDate;
  nom: NullableString;
  prenom: NullableString;
  cabinet: NullableString;
  email: NullableString;
  service_id: NullableNumber;
}
