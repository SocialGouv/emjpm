import { NullableNumber } from "../utils/types.util";

export interface UserRole {
  id: number;
  role_id: NullableNumber;
  user_id: NullableNumber;
}
