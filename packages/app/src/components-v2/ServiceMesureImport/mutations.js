import gql from "graphql-tag";

export const ADD_MESURE_IMPORT = gql`
  mutation addMesureImport(
    $content: jsonb!
    $file_name: String!
    $file_size: Int!
    $file_type: String!
  ) {
    insert_mesures_import(
      objects: {
        content: $content
        file_name: $file_name
        file_size: $file_size
        file_type: $file_type
        status: "UPLOAD"
      }
    ) {
      returning {
        id
        created_at
        file_name
        file_size
        file_type
        processed_at
        status
        user_id
      }
    }
  }
`;
