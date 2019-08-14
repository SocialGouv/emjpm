import { NullableNumber } from "../utils/types.util";

export interface DepartmentAvailability {
  department_id: number;
  mesures_awaiting: NullableNumber;
  mesures_in_progress: NullableNumber;
  mesures_max: NullableNumber;
}
