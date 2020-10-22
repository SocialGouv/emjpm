import { DepartmentAvailabilityAPI } from "./department-availability.api";
import { MandataireAPI } from "./mandataire.api";
import { MesureAPI } from "./mesure.api";
import { ServiceAPI } from "./service.api";

export interface DataSource {
  departmentAvailabilityAPI: DepartmentAvailabilityAPI;
  mandataireAPI: MandataireAPI;
  mesureAPI: MesureAPI;
  serviceAPI: ServiceAPI;
}

export default {
  departmentAvailabilityAPI: new DepartmentAvailabilityAPI(),
  mandataireAPI: new MandataireAPI(),
  mesureAPI: new MesureAPI(),
  serviceAPI: new ServiceAPI()
};
