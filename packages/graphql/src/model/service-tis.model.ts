import { NullableDate, NullableNumber } from "../types";

export interface ServiceTis {
  id: number;
  ti_id: NullableNumber;
  mandataire_id: NullableNumber;
  created_at: NullableDate;
}
