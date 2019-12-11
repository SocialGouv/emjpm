import gql from "graphql-tag";

export const ADD_MANDATAIRE_IMPORT = gql`
  mutation addImport(
    $content: jsonb!
    $file_name: String!
    $file_size: Int!
    $file_type: String!
    $user_id: Int!
  ) {
    insert_mesures_import(
      objects: {
        file_name: $file_name
        file_size: $file_size
        file_type: $file_type
        content: $content
        status: "NEW"
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const ADD_SERVICE_IMPORT = gql`
  mutation addImport(
    $content: jsonb!
    $file_name: String!
    $file_size: Int!
    $file_type: String!
    $service_id: Int!
  ) {
    insert_mesures_import(
      objects: {
        file_name: $file_name
        file_size: $file_size
        file_type: $file_type
        content: $content
        status: "NEW"
        service_id: $service_id
      }
    ) {
      affected_rows
    }
  }
`;
