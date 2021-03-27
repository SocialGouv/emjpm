import gql from "graphql-tag";

export const SYNC_OCMI_ENABLE = gql`
  mutation syncOCMIEnable($mandataireId: Int!, $enable: Boolean!) {
    update_mandataires_by_pk(
      pk_columns: { id: $mandataireId }
      _set: { sync_ocmi_enable: $enable }
    ) {
      id
    }
  }
`;

export const IMPORT_OCMI_MESURES = gql`
  mutation importOcmiMesures {
    import_ocmi_mesures {
      en_cours
      eteinte
    }
  }
`;
