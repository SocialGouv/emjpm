import gql from "graphql-tag";

export const CODE_POSTAL = gql`
  query code_postal($zipcode: String!) {
    geolocalisation_code_postal(
      where: { code_postal: { _eq: $zipcode } }
      distinct_on: cities
    ) {
      cities
    }
  }
`;
