import { NullableDate, NullableNumber } from "../types";

export interface MandataireEtablissements {
  id: number;
  etablissement_id: NullableNumber;
  mandataire_id: NullableNumber;
  created_at: NullableDate;
}
