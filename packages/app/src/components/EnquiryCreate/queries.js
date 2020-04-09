import gql from "graphql-tag";

export const ENQUIRIES = gql`
  query enquiries {
    enquiries {
      created_at
      id
      status
      year
    }
  }
`;
