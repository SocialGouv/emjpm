import gql from "graphql-tag";

export const TRIBUNAL = gql`
  query Trinbunal($name: String!) {
    tis(where: { immutable: { _eq: true }, etablissement: { _ilike: $name } }) {
      id
      etablissement
    }
  }
`;
