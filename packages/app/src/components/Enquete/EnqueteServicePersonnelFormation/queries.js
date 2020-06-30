import gql from "graphql-tag";

export const ENQUETE_REPONSES_SERVICE_PERSONNEL_FORMATION = gql`
  query enquete_reponses_service_personnel_formation($id: Int!) {
    enquete_reponses_service_personnel_formation_by_pk(id: $id) {
      id
      created_at
      last_update
      nb_delegues
      nb_delegues_etp
      nb_delegues_cnc
      nb_delegues_en_formation
      total_heures_delegues_en_formation
      nb_delegues_non_formes
      nb_delegues_niveau1
      nb_delegues_niveau1_etp
      nb_delegues_niveau2
      nb_delegues_niveau2_etp
      nb_delegues_niveau3
      nb_delegues_niveau3_etp
      nb_delegues_niveau4
      nb_delegues_niveau4_etp
      nb_delegues_niveau5
      nb_delegues_niveau5_etp
      nb_delegues_niveau6
      nb_delegues_niveau6_etp
      nb_delegues_homme
      nb_delegues_homme_etp
      nb_delegues_femme
      nb_delegues_femme_etp
    }
  }
`;
