import gql from "graphql-tag";

export const ENQUETES = gql`
  query enquetes {
    enquetes {
      created_at
      id
      status
      annee
      date_fin
    }
  }
`;
