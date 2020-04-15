import gql from "graphql-tag";

export const ENQUIRIES = gql`
  query enquete {
    enquiries {
      created_at
      id
      status
      annee
    }
  }
`;
