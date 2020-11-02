import gql from "graphql-tag";

export const MANDATAIRES_CAPACITY = gql`
  query mesureNatureCategoryStatistics(
    $court: Int
    $department: Int
    $region: Int
  ) {
    mesureNatureCategoryStatistics(
      court: $court
      department: $department
      region: $region
    ) {
      number
      mesureNatureCategory
    }
  }
`;
