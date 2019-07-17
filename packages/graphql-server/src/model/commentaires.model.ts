import {
  NullableDate,
  NullableNumber,
  NullableString
} from "../utils/types.util";

export interface Commentaires {
  id: number;
  comment: NullableString;
  mandataire_id: NullableNumber;
  ti_id: NullableNumber;
  created_at: NullableDate;
}
