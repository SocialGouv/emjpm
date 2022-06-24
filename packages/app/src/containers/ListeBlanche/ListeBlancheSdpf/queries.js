import gql from "graphql-tag";

export const CITY_DEPARTEMENT = gql`
  query city_departement($city: String!) {
    geolocalisation_code_postal(where: { cities: { _eq: $city } }) {
      departement_code
    }
  }
`;
