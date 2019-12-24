import gql from "graphql-tag";

export const MESURES = gql`
  query mesures($id: Int) {
    mesures_aggregate(
      where: {
        numero_rg: { _ilike: null }
        status: { _eq: null }
        type: { _eq: null }
        id: { _eq: $id }
      }
    ) {
      aggregate {
        count
      }
    }
    mesures(
      where: {
        numero_rg: { _ilike: null }
        status: { _eq: null }
        type: { _eq: null }
        id: { _eq: $id }
      }
      limit: null
      order_by: { created_at: desc }
      offset: null
    ) {
      service_antenne {
        id
        name
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
      residence
      numero_rg
      numero_dossier
      etablissement
      annee
      date_ouverture
    }
  }
`;
