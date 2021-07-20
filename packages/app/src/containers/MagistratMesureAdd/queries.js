import gql from "graphql-tag";

export const SERVICE_ANTENNES = gql`
  query serviceAntennes($service_id: Int, $departement_code: String) {
    service_antenne(
      where: {
        service_id: { _eq: $service_id }
        departement_code: { _eq: $departement_code }
      }
    ) {
      id
      name
      code_postal
      ville
      departement_code
    }
  }
`;
