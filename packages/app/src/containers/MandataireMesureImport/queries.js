import gql from "graphql-tag";

export const MESURE_IMPORTS = gql`
  {
    mesures_import {
      id
      created_at
      processed_at
      file_name
      file_size
      file_type
      status
    }
  }
`;
