import gql from "graphql-tag";

export const GET_MANDATAIRES = gql`
  query view_mesure_gestionnaire($offset: Int!) {
    view_mesure_gestionnaire(limit: 10, offset: $offset) {
      discriminator
      mesures_awaiting
      mesures_in_progress
      source_id
      mesures_max
      user {
        mandataire {
          ville
          telephone
          genre
        }
        email
        prenom
        nom
      }
      service {
        ville
        prenom
        nom
        email
        telephone
      }
    }
  }
`;
