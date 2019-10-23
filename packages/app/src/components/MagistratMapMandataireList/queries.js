import gql from "graphql-tag";

export const MESURES_GESTIONNAIRE = gql`
  query view_mesure_gestionnaire($limit: Int!, $tiId: Int!, $offset: Int!, $order: order_by) {
    count: view_mesure_gestionnaire_aggregate(
      where: { gestionnaire_tis: { ti_id: { _eq: $tiId } } }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: view_mesure_gestionnaire(
      limit: $limit
      offset: $offset
      where: { gestionnaire_tis: { ti_id: { _eq: $tiId } } }
      order_by: { remaining_capacity: $order }
    ) {
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

export const MESURES_SERVICE = gql`
  query MesureGestionnaire($id: Int!) {
    mesures(where: { service_antenne: { service_id: { _eq: $id } } }) {
      id
      code_postal
      longitude
      latitude
    }
  }
`;

export const MESURES_MANDATAIRE = gql`
  query MesureGestionnaire($id: Int!) {
    mesures(where: { mandataire_id: { _eq: $id } }) {
      id
      code_postal
      longitude
      latitude
    }
  }
`;
