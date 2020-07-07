import gql from "graphql-tag";

export const MESURE = gql`
  query mesure($id: Int!) {
    mesures(where: { id: { _eq: $id } }) {
      id
      mandataire_id
      service_id
    }
  }
`;

export const MANDATAIRE = gql`
  query mandataire($id: Int) {
    mandataires(where: { id: { _eq: $id } }) {
      id
      mesures_en_attente
      mesures_en_cours
    }
  }
`;

export const SERVICE = gql`
  query service($id: Int) {
    services(where: { id: { _eq: $id } }) {
      id
      mesures_awaiting
      mesures_in_progress
      service_antennes {
        id
        mesures_awaiting
        mesures_in_progress
      }
    }
  }
`;

export const MESURES = gql`
  query mesures($type: String, $status: String, $searchText: String, $offset: Int) {
    mesures_aggregate(
      where: {
        numero_rg: { _ilike: $searchText }
        status: { _eq: "Mesure en attente" }
        type: { _eq: $type }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures(
      offset: $offset
      limit: 20
      where: {
        numero_rg: { _ilike: $searchText }
        status: { _eq: "Mesure en attente" }
        type: { _eq: $type }
      }
      order_by: { created_at: desc }
    ) {
      id
      cabinet
      civilite
      code_postal
      judgment_date
      is_urgent
      departement {
        id
        nom
        region {
          id
          nom
        }
      }
      ti {
        id
        etablissement
      }
      status
      type
      ville
      lieu_vie
      numero_rg
      numero_dossier
      etablissement
      annee_naissance
      date_nomination
    }
  }
`;
