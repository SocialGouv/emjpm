import { AuthDataSource } from "./auth-datasource";

export interface DepartmentAvailabilityResult {
  department: {
    code: string;
    nom: string;
  };
  mesures_awaiting: number;
  mesures_in_progress: number;
  mesures_max: number;
}

export class DepartmentAvailabilityAPI extends AuthDataSource {
  constructor() {
    super();
  }

  public async all(): Promise<DepartmentAvailabilityResult[]> {
    const query = `{
      view_department_availability {
        department {
          code
          nom
        }
        mesures_awaiting
        mesures_in_progress
        mesures_max
      }
    }`;
    return this.post("/", { query }).then(response => {
      return response.data.view_department_availability;
    });
  }
}
