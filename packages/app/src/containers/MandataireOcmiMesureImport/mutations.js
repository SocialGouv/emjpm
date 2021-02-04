import gql from "graphql-tag";

export const IMPORT_OCMI_MESURES = gql`
  mutation importOcmiMesures {
    import_ocmi_mesures {
      en_cours
      eteinte
    }
  }
`;
