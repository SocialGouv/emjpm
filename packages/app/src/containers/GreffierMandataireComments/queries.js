import gql from "graphql-tag";

export const MANDATAIRE_COMMENTS = gql`
  query MandataireComments($service_id: Int, $mandataire_id: Int) {
    commentaires(
      where: {
        service_id: { _eq: $service_id }
        mandataire_id: { _eq: $mandataire_id }
      }
    ) {
      comment
      service_id
      created_at
      id
      mandataire_id
      ti_id
    }
  }
`;
