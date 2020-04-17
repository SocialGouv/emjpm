import gql from "graphql-tag";

export const ENQUETE = gql`
  query enquete($enqueteId: Int!, $serviceId: Int!) {
    enquetes_by_pk(id: $enqueteId) {
      created_at
      annee
    }
    enquete_reponses(where: { service_id: { _eq: $serviceId } }) {
      enquete_service {
        id
      }
    }
  }
`;
