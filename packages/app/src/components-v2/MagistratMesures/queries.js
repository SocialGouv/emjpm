import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($antenne: Int, $type: String, $status: String, $searchText: String, $offset: Int) {
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
      departement {
        nom
        region {
          nom
        }
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
