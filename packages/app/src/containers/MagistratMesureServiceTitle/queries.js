import gql from "graphql-tag";

export const SERVICE = gql`
  query service($id: Int!) {
    services(limit: 1, where: { id: { _eq: $id } }) {
      etablissement
      dispo_max
      mesures_awaiting
      mesures_in_progress
    }
  }
`;
