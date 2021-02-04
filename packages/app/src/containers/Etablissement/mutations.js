import gql from "graphql-tag";

export const IMPORT_FINESS = gql`
  mutation importFiness($url: String!) {
    import_base_finess(url: $url)
  }
`;
