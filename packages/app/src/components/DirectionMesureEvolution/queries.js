import gql from "graphql-tag";

export const GET_CATEGORY_EVOLUTION = gql`
  query mesureTypeCategoryEvolution(
    $end: String!
    $start: String!
    $court: Int
    $department: Int
    $region: Int
  ) {
    mesureNatureCategoryEvolution(
      end: $end
      start: $start
      court: $court
      department: $department
      region: $region
    ) {
      mesureNatureCategory
      start
      end
      monthlyEvolutions {
        month
        number
        year
      }
    }
  }
`;
