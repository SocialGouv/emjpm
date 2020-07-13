import gql from "graphql-tag";

export const GET_CATEGORY_STATS = gql`
  query mesureNatureCategoryStatistics($court: Int, $department: Int, $region: Int) {
    mesureNatureCategoryStatistics(court: $court, department: $department, region: $region) {
      number
      mesureNatureCategory
    }
  }
`;
