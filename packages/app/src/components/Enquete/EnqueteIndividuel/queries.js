import gql from "graphql-tag";

export const ENQUETE_INDIVIDUEL_RESPONSE = gql`
  query enquete_individuel_reponse($enqueteId: Int!, $mandataireId: Int!) {
    enqueteIndividuelReponse(enqueteId: $enqueteId, mandataireId: $mandataireId) {
      submitted_at
      id
      created_at
      enquete_reponses_activite_id
      enquete_reponses_agrements_formations_id
      enquete_reponses_informations_mandataire_id
      enquete_reponses_populations_id
      enquete_reponses_prestations_sociale_id
      mandataire_id
      service_id
      submitted_at
    }
  }
`;
