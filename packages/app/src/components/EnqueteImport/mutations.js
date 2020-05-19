import gql from "graphql-tag";

export const UPLOAD_ENQUETE_EXCEL_FILE = gql`
  mutation upload_enquete_file(
    $base64str: String!
    $enqueteId: Int!
    $serviceId: Int
    $mandataireUserId: Int
  ) {
    upload_enquete_file(
      base64str: $base64str
      enqueteId: $enqueteId
      serviceId: $serviceId
      mandataireUserId: $mandataireUserId
    ) {
      data
    }
  }
`;
