import gql from "graphql-tag";

export const GET_DEPARTEMENTS_AVAILABILITY = gql`
  {
    view_department_availability {
      department_id
      mesures_awaiting
      mesures_in_progress
      mesures_max
      department {
        code
        nom
      }
    }
  }
`;
