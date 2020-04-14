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

export const SERVICE = gql`
  query service($id: Int) {
    services(where: { id: { _eq: $id } }) {
      id
      mesures_awaiting
      mesures_in_progress
      service_antennes {
        id
        mesures_awaiting
        mesures_in_progress
      }
    }
  }
`;
