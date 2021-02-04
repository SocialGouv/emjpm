import gql from "graphql-tag";

export const ENQUETE_SERVICE_INFORMATIONS = gql`
  query enquete_reponses_service_informations($id: Int!) {
    enquete_reponses_service_informations_by_pk(id: $id) {
      affiliation_federation
      created_at
      departement
      last_update
      nb_structures_concernees
      type_organisme_gestionnaire
      nom
      region
    }
  }
`;
