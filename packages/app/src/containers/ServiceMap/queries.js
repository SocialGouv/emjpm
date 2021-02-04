import gql from "graphql-tag";

export const MESURES_SERVICE = gql`
  query MesureGestionnaire {
    mesures(where: { status: { _eq: en_cours } }) {
      id
      code_postal
      longitude
      latitude
    }
  }
`;
