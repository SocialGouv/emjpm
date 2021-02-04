import gql from "graphql-tag";

export const UPDATE_ENQUETE_SERVICE_INFORMATIONS = gql`
  mutation update_enquete_reponses_service_informations(
    $id: Int!
    $last_update: timestamptz!
    $region: String
    $nom: String
    $nb_structures_concernees: Int
    $departement: String
    $type_organisme_gestionnaire: String
    $affiliation_federation: String
  ) {
    update_enquete_reponses_service_informations_by_pk(
      pk_columns: { id: $id }
      _set: {
        region: $region
        nom: $nom
        nb_structures_concernees: $nb_structures_concernees
        last_update: $last_update
        departement: $departement
        type_organisme_gestionnaire: $type_organisme_gestionnaire
        affiliation_federation: $affiliation_federation
      }
    ) {
      id
      affiliation_federation
      created_at
      departement
      last_update
      type_organisme_gestionnaire
      nb_structures_concernees
      nom
      region
    }
  }
`;
