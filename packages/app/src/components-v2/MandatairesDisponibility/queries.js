import gql from "graphql-tag";

export const MANDATAIRE_ACTIVITY = gql`
  query mesureTypeCategoryStatistics($court: Int, $department: Int, $region: Int) {
    mesureTypeCategoryStatistics(court: $court, department: $department, region: $region) {
      number
      mesureTypeCategory
    }
  }
`;
