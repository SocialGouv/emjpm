import gql from "graphql-tag";

export const ENQUETE = gql`
  query enquete($id: Int!) {
    enquetes_by_pk(id: $id) {
      created_at
      annee
    }
  }
`;

export const INDIVDUEL_AGREMENT = gql`
  query IndividuelAgrement($mandataire_id: Int) {
    individuel_agrements(where: { mandataire_id: { _eq: $mandataire_id } }) {
      id
      debut_activite_avant_2009
      annee_debut_activite
      annee_agrement
    }
  }
`;

export const INDIVIDUEL_FORMATION = gql`
  query IndividuelFormation($mandataire_id: Int) {
    individuel_formations(where: { mandataire_id: { _eq: $mandataire_id } }) {
      id
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

export const INDIVIDUEL_EXERCICE = gql`
  query IndividuelExercice($mandataire_id: Int) {
    individuel_exercices(where: { mandataire_id: { _eq: $mandataire_id } }) {
      id
      estimation_etp
      secretariat_specialise
      secretariat_specialise_etp
      cumul_prepose
      cumul_prepose_etp
      cumul_delegue_service
      cumul_delegue_service_etp
    }
  }
`;

export const MANDATAIRE = gql`
  query users($userId: Int) {
    users(where: { id: { _eq: $userId } }) {
      id
      email
      nom
      prenom
      mandataire {
        id
        adresse
        code_postal
        latitude
        longitude
        dispo_max
        etablissement
        genre
        siret
        telephone
        telephone_portable
        ville
        competences
      }
    }
  }
`;
