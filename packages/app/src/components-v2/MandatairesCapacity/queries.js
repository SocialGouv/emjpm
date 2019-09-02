import gql from "graphql-tag";

export const MANDATAIRES_CAPACITY = gql`
  query mesureTypeCategoryStatistics($court: Int, $department: Int, $region: Int) {
    mesureTypeCategoryStatistics(court: $court, department: $department, region: $region) {
      number
      mesureTypeCategory
    }
  }
`;
