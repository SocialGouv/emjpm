import { NullableDate, NullableNumber } from "../utils/types.util";

export interface ServiceTis {
  id: number;
  ti_id: NullableNumber;
  mandataire_id: NullableNumber;
  created_at: NullableDate;
}
