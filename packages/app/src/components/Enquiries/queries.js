import gql from "graphql-tag";

export const ENQUIRIES = gql`
  query enquetes {
    enquetes {
      created_at
      id
      status
      annee
    }
  }
`;
