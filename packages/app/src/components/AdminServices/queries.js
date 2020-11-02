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

export const MESURES = gql`
  query mesures($serviceId: Int!) {
    service_antenne_aggregate(
      distinct_on: id
      where: { service_id: { _eq: $serviceId } }
    ) {
      nodes {
        name
        mesures_awaiting
        mesures_in_progress
      }
    }
    services(where: { id: { _eq: $serviceId } }) {
      id
      mesures_awaiting
      mesures_in_progress
    }
    mesures(where: { service_id: { _eq: $serviceId } }) {
      id
      numero_dossier
      annee_naissance
      lieu_vie
      numero_rg
      nature_mesure
      champ_mesure
      status
      date_nomination
      created_at
      ti {
        etablissement
        ville
      }
      service_antenne {
        name
        address_city
        address_zip_code
        mesures_awaiting
        mesures_in_progress
      }
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
      department_id
      adresse
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
      code
      nom
    }
  }
`;
