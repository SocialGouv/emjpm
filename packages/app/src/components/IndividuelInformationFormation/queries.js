import gql from "graphql-tag";

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
