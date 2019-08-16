import gql from "graphql-tag";

export const allMesures = gql`
  {
    mesures(order_by: { created_at: asc }, limit: 10) {
      id
      ville
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  {
    departements(order_by: { code: asc }) {
      id
      code
      nom
    }
  }
`;

export const GET_REGIONS = gql`
  {
    regions(order_by: { nom: asc }) {
      id
      nom
      departements(order_by: { nom: asc }) {
        code
        nom
      }
    }
  }
`;

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

export const GET_CATEGORY_STATS = gql`
  query mesureTypeCategoryStatistics($court: Int, $department: Int, $region: Int) {
    mesureTypeCategoryStatistics(court: $court, department: $department, region: $region) {
      number
      mesureTypeCategory
    }
  }
`;
