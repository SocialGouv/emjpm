import { NullableDate, NullableNumber } from "../types";

export interface UserTis {
  id: number;
  ti_id: NullableNumber;
  user_id: NullableNumber;
  created_at: NullableDate;
}
