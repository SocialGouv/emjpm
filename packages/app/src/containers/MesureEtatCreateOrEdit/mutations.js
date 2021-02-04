import gql from "graphql-tag";

export const UPSERT_MESURE_ETAT = gql`
  mutation upsertMesureEtat(
    $id: Int
    $date_changement_etat: date!
    $mesure_id: Int!
    $nature_mesure: String!
    $champ_mesure: String
    $lieu_vie: String!
    $type_etablissement: String
    $code_postal: String
    $ville: String
    $pays: String!
  ) {
    upsert_mesure_etat(
      id: $id
      date_changement_etat: $date_changement_etat
      mesure_id: $mesure_id
      nature_mesure: $nature_mesure
      champ_mesure: $champ_mesure
      lieu_vie: $lieu_vie
      type_etablissement: $type_etablissement
      code_postal: $code_postal
      ville: $ville
      pays: $pays
    ) {
      id
    }
  }
`;

export const DELETE_MESURE_ETAT = gql`
  mutation deleteMesureEtat($id: Int!, $mesure_id: Int!) {
    delete_mesure_etat_action(id: $id, mesure_id: $mesure_id) {
      affectedRows
    }
  }
`;
