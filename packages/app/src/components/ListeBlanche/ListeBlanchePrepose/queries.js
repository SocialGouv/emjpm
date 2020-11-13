import gql from "graphql-tag";

export const ETABLISSEMENTS = gql`
  query etablissements($input: String!) {
    etablissements(
      where: {
        _or: [
          { rslongue: { _ilike: $input } }
          { ligneacheminement: { _ilike: $input } }
        ]
      }
      limit: 50
    ) {
      id
      ligneacheminement
      rslongue
    }
  }
`;
