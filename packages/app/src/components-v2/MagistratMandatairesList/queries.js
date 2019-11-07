import gql from "graphql-tag";

export const MANDATAIRE_COMMENTS = gql`
  query MandataireComments($antenne_id: Int, $mandataire_id: Int) {
    commentaires(
      where: { antenne_id: { _eq: $antenne_id }, mandataire_id: { _eq: $mandataire_id } }
    ) {
      comment
      antenne_id
      created_at
      id
      mandataire_id
      ti_id
    }
  }
`;

export const GET_MANDATAIRES = gql`
  query view_mesure_gestionnaire(
    $tribunal: Int!
    $offset: Int!
    $discriminator: String
    $order: order_by
    $limit: Int
  ) {
    count: view_mesure_gestionnaire_aggregate(
      where: {
        gestionnaire_tis: { ti_id: { _eq: $tribunal } }
        discriminator: { _eq: $discriminator }
      }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: view_mesure_gestionnaire_tis(
      limit: $limit
      offset: $offset
      order_by: { gestionnaire: { remaining_capacity: $order } }
      where: { discriminator: { _eq: $discriminator }, ti_id: { _eq: $tribunal } }
    ) {
      gestionnaire {
        discriminator
        mesures_awaiting
        mesures_in_progress
        mesures_max
        mandataire_id
        remaining_capacity
        service_id
        mandataire {
          telephone
          ville
          adresse
          commentaires {
            comment
            ti_id
          }
          code_postal
          user {
            nom
            prenom
            email
          }
          genre
          id
        }
        gestionnaire_tis {
          tis {
            id
            etablissement
          }
        }
        service {
          id
          nom
          prenom
          ville
          adresse
          code_postal
          telephone
          email
          etablissement
          service_antennes(where: { headquarters: { _eq: true } }) {
            id
            commentaires {
              comment
              ti_id
            }
          }
        }
      }
    }
  }
`;
