import gql from "graphql-tag";

export const ENQUETE = gql`
  query enquete($id: Int!) {
    enquetes_by_pk(id: $id) {
      created_at
      annee
    }
  }
`;

export const ENQUETE_INDIVIDUEL_RESPONSE = gql`
  query enquete_individuel_reponse($id: Int!) {
    enquete_reponses(where: { enquete_id: { _eq: $id } }) {
      enquete_individuel {
        annee_agrement
        annee_debut_activite
        cnc_dpf_annee_obtention
        cnc_dpf_heure_formation
        cnc_maj_annee_obtention
        cnc_maj_heure_formation
        cnc_mjpm_annee_obtention
        cnc_mjpm_heure_formation
        cumul_delegue_service
        cumul_delegue_service_etp
        cumul_prepose
        cumul_prepose_etp
        debut_activite_avant_2009
        estimation_etp
        id
        niveau_qualification
        niveau_qualification_secretaire_spe
        secretaire_specialise
        secretaire_specialise_etp
      }
    }
  }
`;
