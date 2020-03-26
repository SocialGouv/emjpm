import gql from "graphql-tag";

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
      }
    }
  }
`;
