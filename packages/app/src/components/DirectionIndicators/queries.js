import gql from "graphql-tag";

export const GET_OPEN_MESURE_NUMBER = gql`
  query opnedMesureNumber($end: date!, $start: date!, $departementId: Int, $regionId: Int) {
    stat_opened_mesures(
      end: $end
      start: $start
      departementId: $departementId
      regionId: $regionId
    ) {
      opened_mesures_nb
    }
  }
`;

export const GET_AVAILABLE_MESURE_NUMBER = gql`
  query AvailableMesureNumber($departementId: Int, $regionId: Int) {
    stat_available_mesures(departementId: $departementId, regionId: $regionId) {
      available_mesures_nb
    }
  }
`;

export const GET_CLOSED_MESURE_NUMBER = gql`
  query closedMesureNumber($end: date!, $start: date!, $departementId: Int, $regionId: Int) {
    stat_closed_mesures(
      end: $end
      start: $start
      departementId: $departementId
      regionId: $regionId
    ) {
      closed_mesures_nb
    }
  }
`;

export const GET_GESTIONNAIRE_NUMBER = gql`
  query gestionnaireNumber($type: String, $department: Int, $region: Int) {
    gestionnaireNumber: view_mesure_gestionnaire_aggregate(
      where: {
        discriminator: { _eq: $type }
        departement: { _or: { id: { _eq: $department }, id_region: { _eq: $region } } }
      }
    ) {
      aggregate {
        count(distinct: true)
      }
    }
  }
`;
