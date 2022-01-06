import gql from "graphql-tag";

export const SERVICES = gql`
  query services($limit: Int, $search: String, $offset: Int) {
    services_aggregate: search_services_aggregate(args: { search: $search }) {
      aggregate {
        count
      }
    }
    services: search_services(
      limit: $limit
      order_by: { etablissement: desc }
      offset: $offset
      args: { search: $search }
    ) {
      id
      etablissement
      code_postal
      ville
    }
  }
`;

export const SERVICE = gql`
  query admin_service($serviceId: Int) {
    tis(where: { immutable: { _eq: true } }) {
      id
      etablissement
      code_postal
    }
    services(where: { id: { _eq: $serviceId } }) {
      id
      etablissement
      siret
      code_postal
      ville
      adresse
      location_adresse
      latitude
      longitude
      email
      telephone
      service_members {
        id
        user {
          id
          email
          prenom
          nom
        }
      }
      service_tis {
        id
        ti {
          id
          etablissement
        }
      }
    }
  }
`;

export const DEPARTEMENTS = gql`
  {
    departements(order_by: { nom: asc }) {
      id
      nom
    }
  }
`;
