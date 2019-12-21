import gql from "graphql-tag";

export const MESURE = gql`
  query mesure($id: Int!) {
    mesures(where: { id: { _eq: $id } }) {
      id
      service_id
      antenne_id
    }
  }
`;
