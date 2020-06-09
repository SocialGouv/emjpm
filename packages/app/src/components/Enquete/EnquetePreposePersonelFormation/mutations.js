import gql from "graphql-tag";

export const UPDATE_ENQUETE_PREPOSE_PERSONEL_FORMATION_MJPM = gql`
  mutation update_enquete_prepose_personel_formation(
    $id: Int!
    $nb_preposes_mjpm: Int
    $nb_preposes_mjpm_etp: Float
    $formation_preposes_mjpm: jsonb
  ) {
    update_enquete_reponses_prepose_personel_formation_by_pk(
      pk_columns: { id: $id }
      _set: {
        nb_preposes_mjpm: $nb_preposes_mjpm
        nb_preposes_mjpm_etp: $nb_preposes_mjpm_etp
        formation_preposes_mjpm: $formation_preposes_mjpm
      }
    ) {
      nb_preposes_mjpm
      nb_preposes_mjpm_etp
      formation_preposes_mjpm
      autres_informations
      nb_preposes_homme
      nb_preposes_femme
      nb_autre_personnel
      nb_autre_personnel_etp
    }
  }
`;
