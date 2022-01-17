import gql from "graphql-tag";

export const MESURES_GESTIONNAIRE = gql`
  query MesureGestionnaire($id: String!) {
    view_lb_tis(where: { uid: { _eq: $id } }) {
      id: uid
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
      user_type
    }
  }
`;

export const MESURES_GESTIONNAIRES = gql`
  query MesureGestionnaires($tiId: Int!, $departementCode: String) {
    view_lb_tis: search_ti_view_lb_tis(
      args: { search: null, departementcode: $departementCode, tiid: $tiId }
    ) {
      id: uid
      user_type
      mandataire {
        id
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
