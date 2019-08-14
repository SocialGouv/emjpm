import { DepartmentAvailabilityAPI } from "./department-availability.api";
import { MesureAPI } from "./mesure.api";

export interface DataSource {
  departmentAvailabilityAPI: DepartmentAvailabilityAPI;
  mesureAPI: MesureAPI;
}

export default () => ({
  departmentAvailabilityAPI: new DepartmentAvailabilityAPI(),
  mesureAPI: new MesureAPI()
});
