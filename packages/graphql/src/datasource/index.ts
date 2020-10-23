import { MandataireAPI } from "./mandataire.api";
import { MesureAPI } from "./mesure.api";
import { ServiceAPI } from "./service.api";

export interface DataSource {
  mandataireAPI: MandataireAPI;
  mesureAPI: MesureAPI;
  serviceAPI: ServiceAPI;
}

export default {
  mandataireAPI: new MandataireAPI(),
  mesureAPI: new MesureAPI(),
  serviceAPI: new ServiceAPI()
};
