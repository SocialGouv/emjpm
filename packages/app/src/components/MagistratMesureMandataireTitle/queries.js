import gql from "graphql-tag";

export const MANDATAIRE = gql`
  query mandataire($id: Int!) {
    mandataires(limit: 1, where: { id: { _eq: $id } }) {
      user {
        nom
        prenom
      }
    }
  }
`;
