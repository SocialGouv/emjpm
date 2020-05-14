import gql from "graphql-tag";

export const ENQUETE_INDIVIDUEL_INFORMATIONS_MANDATAIRE = gql`
  query enquete_individuel_informations($id: Int!) {
    enquete_reponses_informations_mandataire_by_pk(id: $id) {
      anciennete
      benevole
      created_at
      estimation_etp
      forme_juridique
      id
      last_update
      local_professionnel
      secretaire_specialise_etp
      sexe
    }
  }
`;

export const ENQUETE_INDIVIDUEL_INFORMATIONS_AGREMENTS = gql`
  query enquete_reponses_agrements($id: Int!) {
    enquete_reponses_agrements_formations_by_pk(id: $id) {
      id
      annee_agrement
      annee_debut_activite
      nb_departements
    }
  }
`;

export const ENQUETE_INDIVIDUEL_INFORMATIONS_FORMATION = gql`
  query enquete_reponses_formation($id: Int!) {
    enquete_reponses_agrements_formations_by_pk(id: $id) {
      cnc_dpf_annee_obtention
      cnc_dpf_heure_formation
      cnc_maj_annee_obtention
      cnc_maj_heure_formation
      cnc_mjpm_annee_obtention
      cnc_mjpm_heure_formation
      created_at
      cumul_delegue_service
      cumul_delegue_service_etp
      cumul_prepose
      cumul_prepose_etp
      debut_activite_avant_2009
      id
      last_update
      niveau_qualification
      niveau_qualification_secretaire_spe
      secretaire_specialise
    }
  }
`;
