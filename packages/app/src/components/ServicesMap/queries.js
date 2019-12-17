import gql from "graphql-tag";

export const MESURES_SERVICE = gql`
  query MesureGestionnaire {
    mesures {
      id
      code_postal
      longitude
      latitude
    }
  }
`;
