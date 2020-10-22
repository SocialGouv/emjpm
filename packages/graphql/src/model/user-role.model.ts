import { NullableNumber } from "../types";

export interface UserRole {
  id: number;
  role_id: NullableNumber;
  user_id: NullableNumber;
}
