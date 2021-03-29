import gql from "graphql-tag";

export const IMPORT_FINESS = gql`
  mutation importFiness {
    import_base_finess
  }
`;

export const CONFIG_FINESS_DATASET_URL = gql`
  mutation configFinessDatasetUrl($url: String!) {
    update_config_by_pk(
      pk_columns: { key: "finess_dataset_url" }
      _set: { value: $url }
    ) {
      value
    }
  }
`;
