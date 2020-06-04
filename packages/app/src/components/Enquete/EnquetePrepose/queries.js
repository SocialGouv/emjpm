import gql from "graphql-tag";

export const ENQUETE_MANDATAIRE_PREPOSE = gql`
  query enquete_mandataire_prepose($enqueteId: Int!, $mandataireId: Int!) {
    enquete_prepose(enqueteId: $enqueteId, mandataireId: $mandataireId) {
      submitted_at
      enquete_id
      enquete_reponses_id
      enquete_reponses_status
      enquete_reponses_modalites_exercice_id
      enquete_reponses_populations_id
    }
  }
`;
