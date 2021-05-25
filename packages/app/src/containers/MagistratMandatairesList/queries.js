import gql from "graphql-tag";

export const MANDATAIRE_COMMENTS = gql`
  query MandataireComments($service_id: Int, $mandataire_id: Int) {
    commentaires(
      where: {
        service_id: { _eq: $service_id }
        mandataire_id: { _eq: $mandataire_id }
      }
    ) {
      comment
      service_id
      created_at
      id
      mandataire_id
      ti_id
    }
  }
`;

export const SERVICE_ANTENNES = gql`
  query ServiceAntennes($serviceId: Int) {
    service_antenne(where: { service_id: { _eq: $serviceId } }) {
      contact_email
      contact_firstname
      contact_lastname
      contact_phone
      mesures_awaiting
      mesures_max
      mesures_in_progress
      name
      id
      code_postal
      adresse
      ville
    }
  }
`;

export const GET_MANDATAIRES = gql`
  query search_ti_view_lb_tis(
    $tribunal: Int!
    $offset: Int!
    $user_type: String
    $orderBy: [view_lb_tis_order_by!]
    $limit: Int
    $searchText: String
    $departementCode: String
    $habilitation: Boolean
    $prefer: Boolean
    $available: Boolean
  ) {
    count: search_ti_view_lb_tis_aggregate(
      args: {
        search: $searchText
        departementcode: $departementCode
        tiid: $tribunal
      }
      where: {
        user_type: { _eq: $user_type }
        habilitation: { _eq: $habilitation }
        prefer: { _eq: $prefer }
        available: { _eq: $available }
      }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: search_ti_view_lb_tis(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      args: {
        search: $searchText
        departementcode: $departementCode
        tiid: $tribunal
      }
      where: {
        user_type: { _eq: $user_type }
        habilitation: { _eq: $habilitation }
        prefer: { _eq: $prefer }
        available: { _eq: $available }
      }
    ) {
      prefer
      habilitation
      available
      user_type
      gestionnaire {
        id
        discriminator
        mesures_awaiting
        mesures_in_progress
        mesures_max
        mesures_last_update
        mandataire_id
        remaining_capacity
        service_id
        mandataire {
          telephone
          ville
          adresse
          commentaires {
            id
            comment
            ti_id
          }
          code_postal
          user {
            id
            nom
            prenom
            email
            last_login
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
          service_members {
            id
            user {
              id
              last_login
            }
          }
        }
      }
    }
  }
`;

export const GET_MANDATAIRES_BY_COORDS = gql`
  query locate_ti_view_lb_tis(
    $offset: Int!
    $user_type: String
    $orderBy: [view_lb_tis_order_by!]
    $limit: Int
    $habilitation: Boolean
    $prefer: Boolean
    $available: Boolean
    $lat: float8!
    $lon: float8!
    $distanceMaxKM: float8
  ) {
    count: locate_ti_view_lb_tis_aggregate(
      args: { lat: $lat, lon: $lon }
      where: {
        user_type: { _eq: $user_type }
        habilitation: { _eq: $habilitation }
        prefer: { _eq: $prefer }
        available: { _eq: $available }
        distance: { _lte: $distanceMaxKM }
      }
    ) {
      aggregate {
        count
      }
    }
    mandatairesList: locate_ti_view_lb_tis(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      args: { lat: $lat, lon: $lon }
      where: {
        user_type: { _eq: $user_type }
        habilitation: { _eq: $habilitation }
        prefer: { _eq: $prefer }
        available: { _eq: $available }
        distance: { _lte: $distanceMaxKM }
      }
    ) {
      distance
      prefer
      habilitation
      available
      user_type
      gestionnaire {
        id
        discriminator
        mesures_awaiting
        mesures_in_progress
        mesures_max
        mesures_last_update
        mandataire_id
        remaining_capacity
        service_id
        mandataire {
          telephone
          ville
          adresse
          commentaires {
            id
            comment
            ti_id
          }
          code_postal
          user {
            id
            nom
            prenom
            email
            last_login
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
          service_members {
            id
            user {
              id
              last_login
            }
          }
        }
      }
    }
  }
`;
