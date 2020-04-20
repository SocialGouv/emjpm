import gql from "graphql-tag";

export const UPDATE_ENQUETE_INDIVIDUEL_INFORMATIONS = gql`
  mutation update_enquete_individuel(
    $id: Int!
    $estimationEtp: String
    $secretaireSpecialise: Boolean
    $secretaireSpecialiseEtp: String
    $cumulPrepose: Boolean
    $cumulPreposeEtp: String
    $cumulDelegueService: Boolean
    $cumulDelegueServiceEtp: String
    $debutActiviteAvant2009: Boolean
    $anneeDebutActivite: Int
    $anneeAgrement: Int
    $cncMjpmAnneeObtention: Int
    $cncMjpmHeureFormation: Int
    $cncMajAnneeObtention: Int
    $cncMajHeureFormation: Int
    $cncDpfAnneeObtention: Int
    $cncDpfHeureFormation: Int
    $niveauQualification: Int
    $niveauQualificationSecretaireSpe: Int
  ) {
    update_enquete_individuels(
      _set: {
        annee_agrement: $anneeAgrement
        annee_debut_activite: $anneeDebutActivite
        cnc_maj_heure_formation: $cncMajHeureFormation
        cnc_mjpm_heure_formation: $cncMjpmHeureFormation
        cnc_maj_annee_obtention: $cncMajAnneeObtention
        cnc_dpf_annee_obtention: $cncDpfAnneeObtention
        cnc_dpf_heure_formation: $cncDpfHeureFormation
        cnc_mjpm_annee_obtention: $cncMjpmAnneeObtention
        cumul_delegue_service: $cumulDelegueService
        cumul_delegue_service_etp: $cumulDelegueServiceEtp
        cumul_prepose: $cumulPrepose
        cumul_prepose_etp: $cumulPreposeEtp
        debut_activite_avant_2009: $debutActiviteAvant2009
        estimation_etp: $estimationEtp
        niveau_qualification: $niveauQualification
        niveau_qualification_secretaire_spe: $niveauQualificationSecretaireSpe
        secretaire_specialise: $secretaireSpecialise
        secretaire_specialise_etp: $secretaireSpecialiseEtp
      }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
      returning {
        id
        annee_agrement
        annee_debut_activite
        cnc_maj_heure_formation
        cnc_mjpm_heure_formation
        cnc_maj_annee_obtention
        cnc_dpf_annee_obtention
        cnc_dpf_heure_formation
        cnc_mjpm_annee_obtention
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
`;
