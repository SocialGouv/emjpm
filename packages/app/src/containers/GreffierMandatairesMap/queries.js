import gql from "graphql-tag";

export const MESURES_GESTIONNAIRE = gql`
  query MesureGestionnaire($id: String!) {
    view_mesure_gestionnaire(where: { id: { _eq: $id } }) {
      id
      mesures_max
      mesures_in_progress
      remaining_capacity
      nom
      mandataire {
        id
        ville
      }
      service {
        id
        ville
      }
      discriminator
    }
  }
`;

export const MESURES_GESTIONNAIRES = gql`
  query MesureGestionnaires($tiId: Int!) {
    view_mesure_gestionnaire(
      where: { gestionnaire_tis: { ti_id: { _eq: $tiId } } }
    ) {
      id
      discriminator
      mandataire {
        id
        code_postal
        longitude
        latitude
      }
      service {
        id
        longitude
        latitude
      }
    }
  }
`;
