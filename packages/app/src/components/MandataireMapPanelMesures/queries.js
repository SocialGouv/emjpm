import gql from "graphql-tag";

export const MESURES = gql`
  query MesuresList($limit: Int, $offset: Int) {
    mesures_aggregate(where: { status: { _eq: "Mesure en cours" } }) {
      aggregate {
        count
      }
    }
    mesures(
      offset: $offset
      limit: $limit
      order_by: { date_ouverture: desc_nulls_first }
      where: { status: { _eq: "Mesure en cours" } }
    ) {
      annee
      antenne_id
      cabinet
      civilite
      code_postal
      created_at
      date_ouverture
      department_id
      etablissement
      etablissement_id
      extinction
      id
      is_urgent
      judgment_date
      mandataire_id
      numero_dossier
      numero_rg
      reason_extinction
      residence
      service_id
      status
      ti_id
      type
      ville
      departement {
        id
        nom
        region {
          nom
        }
      }
      ti {
        id
        etablissement
      }
    }
  }
`;
