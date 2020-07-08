import gql from "graphql-tag";

export const MESURES = gql`
  query MesuresList($limit: Int, $offset: Int, $ids: [Int!]) {
    mesures_aggregate(where: { id: { _in: $ids } }) {
      aggregate {
        count
      }
    }
    mesures(
      offset: $offset
      limit: $limit
      order_by: { date_nomination: desc_nulls_first }
      where: { id: { _in: $ids } }
    ) {
      id
      annee_naissance
      antenne_id
      cabinet
      civilite
      code_postal
      created_at
      date_nomination
      department_id
      etablissement
      etablissement_id
      date_fin_mesure
      is_urgent
      judgment_date
      mandataire_id
      numero_dossier
      numero_rg
      cause_sortie
      lieu_vie
      service_id
      status
      ti_id
      type
      ville
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
    }
  }
`;
