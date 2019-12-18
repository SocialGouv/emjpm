import gql from "graphql-tag";

export const MESURES = gql`
  query MesureGestionnaire {
    mesures {
      id
      code_postal
      longitude
      latitude
    }
  }
`;
