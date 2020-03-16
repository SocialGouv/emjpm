import gql from "graphql-tag";

export const TRIBUNAL = gql`
  query Trinbunal($name: String!) {
    tis(where: { etablissement: { _ilike: $name } }) {
      id
      etablissement
    }
  }
`;
