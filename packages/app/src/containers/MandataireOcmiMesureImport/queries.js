import gql from "graphql-tag";

export const SYNC_OCMI_ENABLED = gql`
  query syncOCMIEnabled($mandataireId: Int!) {
    mandataires_by_pk(id: $mandataireId) {
      sync_ocmi_enable
    }
  }
`;
