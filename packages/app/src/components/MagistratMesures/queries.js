import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($type: String, $status: String, $searchText: String, $offset: Int) {
    mesures_aggregate(
      where: {
        numero_rg: { _ilike: $searchText }
        status: { _eq: "Mesure en attente" }
        type: { _eq: $type }
        id: { _eq: null }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures(
      where: {
        numero_rg: { _ilike: $searchText }
        status: { _eq: "Mesure en attente" }
        type: { _eq: $type }
        id: { _eq: null }
      }
      offset: $offset
      limit: 20
      order_by: { created_at: desc }
    ) {
      id
      cabinet
      civilite
      code_postal
      judgment_date
      is_urgent
      departement {
        nom
        region {
          nom
        }
      }
      ti {
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
