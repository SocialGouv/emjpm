import gql from "graphql-tag";

export const ENQUETE = gql`
  query enquete($id: Int!) {
    enquetes_by_pk(id: $id) {
      created_at
      annee
    }
  }
`;
