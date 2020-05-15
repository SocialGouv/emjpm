import { DepartmentAvailabilityAPI } from "./department-availability.api";
import { EnqueteAPI } from "./enquete.api";
import { MandataireAPI } from "./mandataire.api";
import { MesureAPI } from "./mesure.api";
import { ServiceAPI } from "./service.api";

export interface DataSource {
  departmentAvailabilityAPI: DepartmentAvailabilityAPI;
  mandataireAPI: MandataireAPI;
  mesureAPI: MesureAPI;
  serviceAPI: ServiceAPI;
  enqueteAPI: EnqueteAPI;
}

export default () => ({
  departmentAvailabilityAPI: new DepartmentAvailabilityAPI(),
  enqueteAPI: new EnqueteAPI(),
  mandataireAPI: new MandataireAPI(),
  mesureAPI: new MesureAPI(),
  serviceAPI: new ServiceAPI()
});
