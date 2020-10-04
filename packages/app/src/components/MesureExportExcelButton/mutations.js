import gql from "graphql-tag";

export const EXPORT_MESURES_EXCEL_FILE = gql`
  mutation export_mesures_file($serviceId: Int, $mandataireUserId: Int) {
    export_mesures_file(serviceId: $serviceId, mandataireUserId: $mandataireUserId) {
      data
    }
  }
`;
