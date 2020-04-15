import gql from "graphql-tag";

export const UPDATE_INDIVIDUEL_AGREMENT = gql`
  mutation UpdateIndividuelAgrement(
    $mandataire_id: Int!
    $debut_activite_avant_2009: Boolean!
    $annee_debut_activite: Int
    $annee_agrement: Int!
  ) {
    update_individuel_agrements(
      _set: {
        debut_activite_avant_2009: $debut_activite_avant_2009
        annee_debut_activite: $annee_debut_activite
        annee_agrement: $annee_agrement
      }
      where: { mandataire_id: { _eq: $mandataire_id } }
    ) {
      affected_rows
      returning {
        id
        debut_activite_avant_2009
        annee_debut_activite
        annee_agrement
      }
    }
  }
`;

export const UPDATE_INDIVIDUEL_EXERCICE = gql`
  mutation UpdateIndividuelExercice(
    $mandataire_id: Int!
    $estimation_etp: String!
    $secretariat_specialise: Boolean!
    $secretariat_specialise_etp: Float
    $cumul_prepose: Boolean!
    $cumul_prepose_etp: String
    $cumul_delegue_service: Boolean!
    $cumul_delegue_service_etp: String
  ) {
    update_individuel_exercices(
      _set: {
        estimation_etp: $estimation_etp
        secretariat_specialise: $secretariat_specialise
        secretariat_specialise_etp: $secretariat_specialise_etp
        cumul_prepose: $cumul_prepose
        cumul_prepose_etp: $cumul_prepose_etp
        cumul_delegue_service: $cumul_delegue_service
        cumul_delegue_service_etp: $cumul_delegue_service_etp
      }
      where: { mandataire_id: { _eq: $mandataire_id } }
    ) {
      affected_rows
      returning {
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
  }
`;

export const UPDATE_INDIVIDUEL_FORMATION = gql`
  mutation UpdateIndividuelFormation(
    $mandataire_id: Int!
    $cnc_mjpm_annee_obtention: Int!
    $cnc_mjpm_heure_formation: Int!
    $cnc_maj_annee_obtention: Int
    $cnc_maj_heure_formation: Int
    $cnc_dpf_annee_obtention: Int
    $cnc_dpf_heure_formation: Int
    $niveau_qualification: Int!
    $niveau_qualification_secretaire_spe: Int
  ) {
    update_individuel_formations(
      _set: {
        cnc_mjpm_annee_obtention: $cnc_mjpm_annee_obtention
        cnc_mjpm_heure_formation: $cnc_mjpm_heure_formation
        cnc_maj_annee_obtention: $cnc_maj_annee_obtention
        cnc_maj_heure_formation: $cnc_maj_heure_formation
        cnc_dpf_annee_obtention: $cnc_dpf_annee_obtention
        cnc_dpf_heure_formation: $cnc_dpf_heure_formation
        niveau_qualification: $niveau_qualification
        niveau_qualification_secretaire_spe: $niveau_qualification_secretaire_spe
      }
      where: { mandataire_id: { _eq: $mandataire_id } }
    ) {
      affected_rows
      returning {
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
  }
`;

export const UPDATE_MANDATAIRE = gql`
  mutation mandataire_update(
    $dispo_max: Int!
    $telephone: String
    $telephone_portable: String
    $ville: String
    $longitude: Float
    $latitude: Float
    $adresse: String
    $code_postal: String!
    $genre: String
    $siret: String!
    $prenom: String!
    $nom: String!
    $email: String!
    $id: Int!
    $department_id: Int!
    $competences: String
  ) {
    update_mandataires(
      _set: {
        dispo_max: $dispo_max
        siret: $siret
        telephone: $telephone
        telephone_portable: $telephone_portable
        ville: $ville
        longitude: $longitude
        latitude: $latitude
        adresse: $adresse
        code_postal: $code_postal
        genre: $genre
        department_id: $department_id
        competences: $competences
      }
      where: { user_id: { _eq: $id } }
    ) {
      affected_rows
    }
    update_users(_set: { prenom: $prenom, nom: $nom, email: $email }, where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        id
        email
        nom
        prenom
      }
    }
  }
`;
