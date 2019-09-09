import gql from "graphql-tag";

export const GET_MANDATAIRES = gql`
  query view_mesure_gestionnaire($offset: Int!) {
    count: view_mesure_gestionnaire_aggregate {
      aggregate {
        count
      }
    }
    mandatairesList: view_mesure_gestionnaire(limit: 10, offset: $offset) {
      discriminator
      mesures_awaiting
      mesures_in_progress
      mesures_max
      mandataire_id
      service_id
      mandataire {
        telephone
        ville
        user {
          nom
          prenom
          email
        }
        genre
        id
      }
      service {
        id
        nom
        prenom
        ville
        telephone
        email
      }
    }
  }
`;
