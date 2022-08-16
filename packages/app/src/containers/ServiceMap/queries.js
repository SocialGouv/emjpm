import gql from "graphql-tag";

export const MESURES_SERVICE = gql`
  query MesureGestionnaire($serviceId: Int!) {
    mesures(
      where: { status: { _eq: en_cours }, service_id: { _eq: $serviceId } }
    ) {
      id
      code_postal
      longitude
      latitude
    }
  }
`;
