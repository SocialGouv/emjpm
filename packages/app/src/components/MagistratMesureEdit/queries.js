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
      date_ouverture
    }
  }
`;
