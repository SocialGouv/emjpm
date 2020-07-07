import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($limit: Int, $offset: Int, $ids: [Int!]) {
    mesures_aggregate(where: { id: { _in: $ids } }) {
      aggregate {
        count
      }
    }
    mesures(
      where: { id: { _in: $ids } }
      limit: $limit
      order_by: { created_at: desc_nulls_last }
      offset: $offset
    ) {
      antenne_id
      service_id
      id
      cabinet
      civilite
      code_postal
      judgment_date
      is_urgent
      latitude
      longitude
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
