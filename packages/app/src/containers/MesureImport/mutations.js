import gql from "graphql-tag";

export const UPLOAD_MESURES_EXCEL_FILE = gql`
  mutation upload_mesures_file(
    $name: String!
    $type: String!
    $content: String!
    $antennesMap: String
    $serviceId: Int
    $mandataireUserId: Int
  ) {
    upload_mesures_file(
      name: $name
      type: $type
      content: $content
      antennesMap: $antennesMap
      serviceId: $serviceId
      mandataireUserId: $mandataireUserId
    ) {
      data
    }
  }
`;
