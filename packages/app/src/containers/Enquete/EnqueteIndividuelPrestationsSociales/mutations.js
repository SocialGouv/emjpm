import gql from "graphql-tag";

export const UPDATE_ENQUETE_INDIVIDUEL_PRESTATIONS_SOCIALES = gql`
  mutation update_enquete_prestations_sociales(
    $id: Int!
    $aah: Int
    $pch: Int
    $asi: Int
    $rsa: Int
    $als_apl: Int
    $aspa: Int
    $apa: Int
  ) {
    update_enquete_reponses_prestations_sociales(
      where: { enquete_reponses_id: { _eq: $id } }
      _set: {
        aah: $aah
        pch: $pch
        asi: $asi
        rsa: $rsa
        als_apl: $als_apl
        aspa: $aspa
        apa: $apa
      }
    ) {
      returning {
        aah
        als_apl
        apa
        asi
        aspa
        created_at
        id
        last_update
        pch
        rsa
      }
    }
  }
`;
