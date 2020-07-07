import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($id: Int) {
    mesures_aggregate(where: { id: { _eq: $id } }) {
      aggregate {
        count
      }
    }
    mesures(
      where: { id: { _eq: $id } }
      limit: null
      order_by: { created_at: desc }
      offset: null
    ) {
      service_antenne {
        name
        id
      }
      id
      cabinet
      civilite
      code_postal
      latitude
      longitude
      antenne_id
      latitude
      longitude
      judgment_date
      is_urgent
      mandataire_id
      service_id
      pays
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
