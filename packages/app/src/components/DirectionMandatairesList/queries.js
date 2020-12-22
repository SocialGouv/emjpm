import gql from "graphql-tag";

export const GET_MANDATAIRES = gql`
  query viewMesureGestionnaireByDepartement(
    $offset: Int!
    $limit: Int!
    $departement: Int
    $region: Int
    $discriminator: String
    $order: order_by
  ) {
    count: view_mesure_gestionnaire_departement_aggregate(
      where: {
        discriminator: { _eq: $discriminator }
        departement: { id_region: { _eq: $region }, id: { _eq: $departement } }
      }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: view_mesure_gestionnaire_departement(
      limit: $limit
      offset: $offset
      where: {
        discriminator: { _eq: $discriminator }
        departement: { id_region: { _eq: $region }, id: { _eq: $departement } }
      }
      order_by: { remaining_capacity: $order }
    ) {
      id
      discriminator
      mesures_awaiting
      mesures_in_progress
      mesures_max
      mandataire_id
      remaining_capacity
      service_id
      mandataire {
        id
        telephone
        ville
        user {
          id
          nom
          prenom
          email
        }
        genre
      }
      service {
        id
        etablissement
        nom
        prenom
        ville
        telephone
        email
      }
    }
  }
`;
