import gql from "graphql-tag";

export const UPLOAD_ENQUETE_EXCEL_FILE = gql`
  mutation upload_enquete_file(
    $content: String!
    $enqueteId: Int!
    $userId: Int
  ) {
    upload_enquete_file(
      content: $content
      enqueteId: $enqueteId
      userId: $userId
    ) {
      data
    }
  }
`;
