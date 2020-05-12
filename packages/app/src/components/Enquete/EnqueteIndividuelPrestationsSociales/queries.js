import gql from "graphql-tag";

export const ENQUETE_INDIVIDUEL_PRESTATION_SOCIALES = gql`
  query enquete_individuel_prestation_sociales($id: Int!) {
    enquete_individuels_by_pk(id: $id) {
      ps_aah
      ps_pch
      ps_asi
      ps_rsa
      ps_als_apl
      ps_aspa
      ps_apa
    }
  }
`;
