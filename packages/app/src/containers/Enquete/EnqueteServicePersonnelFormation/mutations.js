import gql from "graphql-tag";

export const UPDATE_ENQUETE_REPONSE_SERVICE_PERSONNEL_FORMATION = gql`
  mutation update_enquete_reponses_service_personnel_formation(
    $id: Int!
    $nb_delegues: Int
    $nb_delegues_etp: Float
    $nb_delegues_cnc: Int
    $nb_delegues_en_formation: Int
    $total_heures_delegues_en_formation: Float
    $nb_delegues_non_formes: Int
    $nb_delegues_niveau1: Int
    $nb_delegues_niveau1_etp: Float
    $nb_delegues_niveau2: Int
    $nb_delegues_niveau2_etp: Float
    $nb_delegues_niveau3: Int
    $nb_delegues_niveau3_etp: Float
    $nb_delegues_niveau4: Int
    $nb_delegues_niveau4_etp: Float
    $nb_delegues_niveau5: Int
    $nb_delegues_niveau5_etp: Float
    $nb_delegues_niveau6: Int
    $nb_delegues_niveau6_etp: Float
    $nb_delegues_homme: Int
    $nb_delegues_homme_etp: Float
    $nb_delegues_femme: Int
    $nb_delegues_femme_etp: Float
  ) {
    update_enquete_reponses_service_personnel_formation_by_pk(
      pk_columns: { id: $id }
      _set: {
        nb_delegues: $nb_delegues
        nb_delegues_etp: $nb_delegues_etp
        nb_delegues_cnc: $nb_delegues_cnc
        nb_delegues_en_formation: $nb_delegues_en_formation
        total_heures_delegues_en_formation: $total_heures_delegues_en_formation
        nb_delegues_non_formes: $nb_delegues_non_formes
        nb_delegues_niveau1: $nb_delegues_niveau1
        nb_delegues_niveau1_etp: $nb_delegues_niveau1_etp
        nb_delegues_niveau2: $nb_delegues_niveau2
        nb_delegues_niveau2_etp: $nb_delegues_niveau2_etp
        nb_delegues_niveau3: $nb_delegues_niveau3
        nb_delegues_niveau3_etp: $nb_delegues_niveau3_etp
        nb_delegues_niveau4: $nb_delegues_niveau4
        nb_delegues_niveau4_etp: $nb_delegues_niveau4_etp
        nb_delegues_niveau5: $nb_delegues_niveau5
        nb_delegues_niveau5_etp: $nb_delegues_niveau5_etp
        nb_delegues_niveau6: $nb_delegues_niveau6
        nb_delegues_niveau6_etp: $nb_delegues_niveau6_etp
        nb_delegues_homme: $nb_delegues_homme
        nb_delegues_homme_etp: $nb_delegues_homme_etp
        nb_delegues_femme: $nb_delegues_femme
        nb_delegues_femme_etp: $nb_delegues_femme_etp
      }
    ) {
      id
    }
  }
`;
