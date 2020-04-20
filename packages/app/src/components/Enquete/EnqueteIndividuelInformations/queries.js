import gql from "graphql-tag";

export const ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE = gql`
  query enquete_individuel_informations($id: Int!) {
    enquete_individuels_by_pk(id: $id) {
      annee_debut_activite
      cumul_delegue_service
      cumul_delegue_service_etp
      cumul_prepose
      cumul_prepose_etp
      debut_activite_avant_2009
      estimation_etp
      secretaire_specialise
      secretaire_specialise_etp
    }
  }
`;

export const ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENT_FORMATION = gql`
  query enquete_individuel_informations($id: Int!) {
    enquete_individuels_by_pk(id: $id) {
      annee_agrement
      cnc_mjpm_annee_obtention
      cnc_mjpm_heure_formation
      cnc_maj_annee_obtention
      cnc_maj_heure_formation
      cnc_dpf_annee_obtention
      cnc_dpf_heure_formation
      niveau_qualification
      niveau_qualification_secretaire_spe
    }
  }
`;
