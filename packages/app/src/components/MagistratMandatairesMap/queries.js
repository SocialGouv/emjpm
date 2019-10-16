import gql from "graphql-tag";

export const MESURES_GESTIONNAIRE = gql`
  query MesureGestionnaire($tiId: Int!) {
    view_mesure_gestionnaire(where: { gestionnaire_tis: { ti_id: { _eq: $tiId } } }) {
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

export const MESURES_SERVICE = gql`
  query MesureGestionnaire($id: Int!) {
    mesures(where: { service_antenne: { service_id: { _eq: $id } } }) {
      id
      code_postal
    }
  }
`;
