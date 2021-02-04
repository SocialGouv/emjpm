import gql from "graphql-tag";

export const MESURES = gql`
  query MesureGestionnaire {
    mesures(where: { status: { _eq: en_cours } }) {
      id
      code_postal
      longitude
      latitude
    }
  }
`;
