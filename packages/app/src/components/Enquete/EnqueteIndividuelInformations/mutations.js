import gql from "graphql-tag";

export const UPDATE_ENQUETE_INFORMATIONS_AGREMENTS = gql`
  mutation update_enquete_individuel_agrements(
    $id: Int!
    $annee_agrement: Int
    $nb_departements: Int
  ) {
    update_enquete_reponses_agrements_formations_by_pk(
      pk_columns: { id: $id }
      _set: { annee_agrement: $annee_agrement, nb_departements: $nb_departements }
    ) {
      id
      annee_agrement
      nb_departements
    }
  }
`;

export const UPDATE_ENQUETE_INFORMATIONS_FORMATION = gql`
  mutation update_enquete_individuel_formation(
    $id: Int!
    $cnc_dpf_annee_obtention: Int
    $cnc_dpf_heure_formation: Int
    $cnc_maj_annee_obtention: Int
    $cnc_maj_heure_formation: Int
    $cnc_mjpm_annee_obtention: Int
    $cnc_mjpm_heure_formation: Int
    $cumul_delegue_service: Boolean
    $cumul_delegue_service_etp: String
    $cumul_prepose: Boolean
    $cumul_prepose_etp: String
    $debut_activite_avant_2009: Boolean
    $niveau_qualification: Int
    $niveau_qualification_secretaire_spe: Int
    $secretaire_specialise: Boolean
  ) {
    update_enquete_reponses_agrements_formations_by_pk(
      pk_columns: { id: $id }
      _set: {
        cnc_dpf_annee_obtention: $cnc_dpf_annee_obtention
        cnc_dpf_heure_formation: $cnc_dpf_heure_formation
        cnc_maj_annee_obtention: $cnc_maj_annee_obtention
        cnc_maj_heure_formation: $cnc_maj_heure_formation
        cnc_mjpm_annee_obtention: $cnc_mjpm_annee_obtention
        cnc_mjpm_heure_formation: $cnc_mjpm_heure_formation
        cumul_delegue_service: $cumul_delegue_service
        cumul_delegue_service_etp: $cumul_delegue_service_etp
        cumul_prepose: $cumul_prepose
        cumul_prepose_etp: $cumul_prepose_etp
        debut_activite_avant_2009: $debut_activite_avant_2009
        niveau_qualification: $niveau_qualification
        niveau_qualification_secretaire_spe: $niveau_qualification_secretaire_spe
        secretaire_specialise: $secretaire_specialise
      }
    ) {
      id
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
      niveau_qualification
      niveau_qualification_secretaire_spe
      secretaire_specialise
    }
  }
`;

export const UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS = gql`
  mutation update_enquete_individuel_informations(
    $id: Int!
    $anciennete: String
    $benevole: Boolean
    $estimation_etp: String
    $forme_juridique: String
    $local_professionnel: Boolean
    $secretaire_specialise_etp: String
    $sexe: String
  ) {
    update_enquete_reponses_informations_mandataire_by_pk(
      pk_columns: { id: $id }
      _set: {
        anciennete: $anciennete
        benevole: $benevole
        estimation_etp: $estimation_etp
        forme_juridique: $forme_juridique
        local_professionnel: $local_professionnel
        secretaire_specialise_etp: $secretaire_specialise_etp
        sexe: $sexe
      }
    ) {
      sexe
      secretaire_specialise_etp
      local_professionnel
      last_update
      id
      forme_juridique
      estimation_etp
      created_at
      benevole
      anciennete
    }
  }
`;
