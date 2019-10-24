import gql from "graphql-tag";

export const IMPORT_MESURES = gql`
  mutation importMesures(
    $content: [MesureImportData!]!
    $file_name: String!
    $file_size: Int!
    $file_type: String!
  ) {
    importMesures(
      content: $content
      file_name: $file_name
      file_size: $file_size
      file_type: $file_type
    )
  }
`;
