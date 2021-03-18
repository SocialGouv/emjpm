import gql from "graphql-tag";

export const ENQUETE_SERVICE_INFORMATIONS = gql`
  query enquete_reponses_service_informations($id: Int!) {
    enquete_reponses_service_informations(
      where: { enquete_reponses_id: { _eq: $id } }
    ) {
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
