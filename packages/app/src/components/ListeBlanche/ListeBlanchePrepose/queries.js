import gql from "graphql-tag";

export const ETABLISSEMENTS = gql`
  query etablissements($input: String!) {
    etablissements(where: { nom: { _ilike: $input } }, limit: 50) {
      id
      nom
    }
  }
`;
