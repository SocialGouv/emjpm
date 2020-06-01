import gql from "graphql-tag";

export const SUBMIT_ENQUETE_INDIVIDUEL = gql`
  mutation submit_enquete_individuel($id: Int!) {
    submit_enquete_individuel(id: $id) {
      enquete_id
      enquete_reponses_id
      submitted_at
    }
  }
`;

export const CREATE_ENQUETE_INDIVIDUEL = gql`
  mutation create_enquete_individuel(
    $enqueteId: Int!
    $mandataireId: Int!
    $estimationEtp: String
    $secretaireSpecialise: Boolean
    $secretaireSpecialiseEtp: Float
    $cumulPrepose: Boolean
    $cumulPreposeEtp: String
    $cumulDelegueService: Boolean
    $cumulDelegueServiceEtp: String
    $debutActiviteAvant2009: Boolean
    $anneeDebutActivite: Int
    $anneeAgrement: Int
    $cnc_annee_obtention: Int
    $cnc_heures_formation: Int
    $niveauQualification: Int
    $niveauQualificationSecretaireSpe: Int
  ) {
    insert_enquete_reponses(
      objects: {
        type: "created"
        enquete_individuel: {
          data: {
            annee_agrement: $anneeAgrement
            annee_debut_activite: $anneeDebutActivite
            cnc_annee_obtention: $cnc_annee_obtention
            cnc_heures_formation: $cnc_heures_formation
            cumul_delegue_service: $cumulDelegueService
            cumul_delegue_service_etp: $cumulDelegueServiceEtp
            cumul_prepose: $cumulPrepose
            cumul_prepose_etp: $cumulPreposeEtp
            debut_activite_avant_2009: $debutActiviteAvant2009
            estimation_etp: $estimationEtp
            mandataire_id: $mandataireId
            niveau_qualification: $niveauQualification
            niveau_qualification_secretaire_spe: $niveauQualificationSecretaireSpe
            secretaire_specialise: $secretaireSpecialise
            secretaire_specialise_etp: $secretaireSpecialiseEtp
          }
        }
        enquete_id: $enqueteId
      }
    ) {
      affected_rows
      returning {
        id
        enquete_individuel {
          id
          annee_agrement
          annee_debut_activite
          cnc_annee_obtention
          cnc_heures_formation
          cumul_delegue_service
          cumul_delegue_service_etp
          cumul_prepose
          cumul_prepose_etp
          debut_activite_avant_2009
          estimation_etp
          mandataire_id
          niveau_qualification
          niveau_qualification_secretaire_spe
          secretaire_specialise
          secretaire_specialise_etp
        }
      }
    }
  }
`;
