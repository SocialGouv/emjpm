import gql from "graphql-tag";

export const GET_CATEGORY_STATS = gql`
  query mesureTypeCategoryStatistics($court: Int, $department: Int, $region: Int) {
    mesureTypeCategoryStatistics(court: $court, department: $department, region: $region) {
      number
      mesureTypeCategory
    }
  }
`;
