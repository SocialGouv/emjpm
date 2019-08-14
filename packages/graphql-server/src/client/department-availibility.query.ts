import { gql } from "apollo-server-koa";
import { query } from "./apollo-client";

export interface DepartmentAvailabilityResultWrapper {
  view_department_availability: DepartmentAvailabilityResult[];
}

export interface DepartmentAvailabilityResult {
  department: {
    code: string;
    nom: string;
  };
  mesures_awaiting: number;
  mesures_in_progress: number;
  mesures_max: number;
}

export const departmentAvailabilityQuery = {
  all: () => {
    const qglQuery = gql`
      {
        view_department_availability {
          department {
            code
            nom
          }
          mesures_awaiting
          mesures_in_progress
          mesures_max
        }
      }
    `;
    return query<DepartmentAvailabilityResultWrapper>(qglQuery).then(
      queryResult => queryResult.data.view_department_availability
    );
  }
};
