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

export const MESURES_SERVICE = gql`
  query MesureGestionnaire($id: Int!) {
    mesures(where: { service_id: { _eq: $id } }) {
      id
      code_postal
      longitude
      latitude
    }
  }
`;

export const MESURES = gql`
  query MesureGestionnaire {
    mesures {
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
