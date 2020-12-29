import gql from "graphql-tag";

export const INSERT_MESURE_RESSOURCE = gql`
  mutation insertMesureRessource(
    $mesure_id: Int!
    $annee: Int!
    $niveau_ressource: numeric!
    $prestations_sociales: [mesure_ressources_prestations_sociales_insert_input!]!
  ) {
    insert_mesure_ressources(
      objects: {
        mesure_id: $mesure_id
        annee: $annee
        niveau_ressource: $niveau_ressource
        mesure_ressources_prestations_sociales: { data: $prestations_sociales }
      }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const UPDATE_MESURE_RESSOURCE = gql`
  mutation updateMesureRessource(
    $id: Int!
    $annee: Int!
    $niveau_ressource: numeric!
    $prestations_sociales: [prestations_sociales_enum!]!
    $prestations_sociales_insert_input: [mesure_ressources_prestations_sociales_insert_input!]!
  ) {
    update_mesure_ressources_by_pk(
      pk_columns: { id: $id }
      _set: { annee: $annee, niveau_ressource: $niveau_ressource }
    ) {
      id
    }
    delete_mesure_ressources_prestations_sociales(
      where: {
        _and: {
          mesure_ressources_id: { _eq: $id }
          prestations_sociales: { _nin: $prestations_sociales }
        }
      }
    ) {
      affected_rows
    }

    insert_mesure_ressources_prestations_sociales(
      objects: $prestations_sociales_insert_input
      on_conflict: {
        constraint: mesure_ressources_prestations_mesure_ressources_id_prestati_key
        update_columns: []
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_MESURE_RESSOURCE = gql`
  mutation deleteMesureRessource($id: Int!) {
    delete_mesure_ressources_by_pk(id: $id) {
      id
    }
  }
`;
