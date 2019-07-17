import { NullableDate, NullableNumber } from "../utils/types.util";

export interface UserTis {
  id: number;
  ti_id: NullableNumber;
  user_id: NullableNumber;
  created_at: NullableDate;
}
