import gql from "graphql-tag";

export const GET_NEW_MESURE_NUMBER = gql`
  query NewMesureNumber(
    $end: String!
    $start: String!
    $court: Int
    $department: Int
    $region: Int
  ) {
    newMesureNumber(
      end: $end
      start: $start
      court: $court
      department: $department
      region: $region
    )
  }
`;

export const GET_OPEN_MESURE_NUMBER = gql`
  query OpenMesureNumber($court: Int, $department: Int, $region: Int) {
    openMesureNumber(court: $court, department: $department, region: $region)
  }
`;

export const GET_AVAILABLE_MESURE_NUMBER = gql`
  query AvailableMesureNumber($court: Int, $department: Int, $region: Int) {
    availableMesureNumber(court: $court, department: $department, region: $region)
  }
`;

export const GET_CLOSED_MESURE_NUMBER = gql`
  query closedMesureNumber(
    $end: String!
    $start: String!
    $court: Int
    $department: Int
    $region: Int
  ) {
    closedMesureNumber(
      end: $end
      start: $start
      court: $court
      department: $department
      region: $region
    )
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
