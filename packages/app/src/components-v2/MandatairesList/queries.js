import gql from "graphql-tag";

export const GET_MANDATAIRES = gql`
  query view_mesure_gestionnaire($offset: Int!) {
    mandatairesList: view_mesure_gestionnaire(limit: 10, offset: $offset) {
      discriminator
      mesures_awaiting
      mesures_in_progress
      mesures_max
      mandataire {
        ville
        telephone
        genre
        user {
          email
          prenom
          nom
        }
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
