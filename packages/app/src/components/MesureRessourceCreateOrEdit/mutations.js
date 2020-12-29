import gql from "graphql-tag";

export const UPSERT_MESURE_RESSOURCE = gql`
  mutation upsertMesureRessource(
    $id: Int
    $mesure_id: Int!
    $annee: Int!
    $niveau_ressource: money!
    $prestations_sociales: [mesure_ressources_prestations_sociales_insert_input!]!
  ) {
    insert_mesure_ressources(
      objects: [
        {
          id: $id
          mesure_id: $mesure_id
          annee: $annee
          niveau_ressource: $niveau_ressource
          prestations_sociales: {
            data: $prestations_sociales
            on_conflict: {
              constraint: mesure_ressources_prestations_sociales_pkey
              update_columns: [prestations_sociales]
            }
          }
        }
      ]
      on_conflict: {
        constraint: mesure_ressources_pkey
        update_columns: [annee, niveau_ressource]
      }
    ) {
      returning {
        id
        prestations_sociales {
          id
        }
      }
    }
  }
`;

export const DELETE_MESURE_RESSOURCE = gql`
  mutation deleteMesureRessource($id: Int!, $mesure_id: Int!) {
    delete_mesure_ressource_action(id: $id, mesure_id: $mesure_id) {
      affectedRows
    }
  }
`;
