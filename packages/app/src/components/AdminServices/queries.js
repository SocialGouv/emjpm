import gql from "graphql-tag";

export const SERVICES = gql`
  query services($limit: Int, $searchText: String, $offset: Int) {
    services_aggregate(where: { etablissement: { _ilike: $searchText } }) {
      aggregate {
        count
      }
    }
    services(
      limit: $limit
      order_by: { etablissement: desc }
      offset: $offset
      where: { etablissement: { _ilike: $searchText } }
    ) {
      id
      etablissement
      code_postal
      ville
      department_id
    }
  }
`;

export const SERVICE = gql`
  query service($serviceId: Int) {
    services(where: { id: { _eq: $serviceId } }) {
      id
      etablissement
      code_postal
      ville
      department_id
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
