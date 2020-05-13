import gql from "graphql-tag";

export const UPDATE_ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES = gql`
  mutation update_enquete_prestations_sociales(
    $id: Int!
    $aah: Int
    $pch: Int
    $asi: Int
    $rsa: Int
    $als: Int
    $aspa: Int
    $apa: Int
  ) {
    update_enquete_individuels_by_pk(
      pk_columns: { id: $id }
      _set: {
        ps_aah: $aah
        ps_pch: $pch
        ps_asi: $asi
        ps_rsa: $rsa
        ps_als_apl: $als
        ps_aspa: $aspa
        ps_apa: $apa
      }
    ) {
      id
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
