import gql from "graphql-tag";

export const MESURES = gql`
  query magistratMesures($type: String, $status: String, $searchText: String, $offset: Int) {
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
      where: {
        numero_rg: { _ilike: $searchText }
        status: { _eq: "Mesure en attente" }
        type: { _eq: $type }
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
      annee
      date_ouverture
    }
  }
`;
