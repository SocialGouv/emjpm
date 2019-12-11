import { NullableNumber } from "../utils/types.util";

export interface Departements {
  id: number;
  id_region: NullableNumber;
  code: string;
  nom: string;
}
