import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($limit: Int, $offset: Int) {
    mesures_aggregate(where: { status: { _eq: "Mesure en cours" } }) {
      aggregate {
        count
      }
    }
    mesures(
      where: { status: { _eq: "Mesure en cours" } }
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
        nom
        region {
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
      residence
      numero_rg
      numero_dossier
      etablissement
      annee
      date_ouverture
    }
  }
`;
