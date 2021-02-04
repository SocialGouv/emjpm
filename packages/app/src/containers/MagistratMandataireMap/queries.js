import gql from "graphql-tag";

export const MESURES = gql`
  query MapMesures($serviceId: Int, $mandataireId: Int) {
    mesures(
      where: {
        status: { _eq: en_cours }
        mandataire_id: { _eq: $mandataireId }
        service_id: { _eq: $serviceId }
      }
    ) {
      id
      code_postal
      longitude
      latitude
    }
  }
`;
