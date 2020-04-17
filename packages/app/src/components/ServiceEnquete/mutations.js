import gql from "graphql-tag";

export const CREATE_ENQUETE_SERVICES = gql`
  mutation create_enquete_services($enqueteId: Int!) {
    insert_enquete_reponses(
      objects: {
        type: "created"
        enquete_service: { data: { nombre_postes_delegues_etp: "" } }
        enquete_id: $enqueteId
      }
    ) {
      affected_rows
    }
  }
`;
