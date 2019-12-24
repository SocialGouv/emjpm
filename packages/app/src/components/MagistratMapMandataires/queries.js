import gql from "graphql-tag";

export const MESURES_GESTIONNAIRE = gql`
  query MesureGestionnaire($tiId: Int!) {
    view_mesure_gestionnaire(where: { gestionnaire_tis: { ti_id: { _eq: $tiId } } }) {
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

export const MESURES_GESTIONNAIRE_LIMITE = gql`
  query MesureGestionnaire($tiId: Int!, $offset: Int!) {
    view_mesure_gestionnaire(
      where: { gestionnaire_tis: { ti_id: { _eq: $tiId } } }
      limit: 10
      offset: $offset
    ) {
      id
      discriminator
      mandataire {
        id
        code_postal
      }
      service {
        id
      }
    }
  }
`;
