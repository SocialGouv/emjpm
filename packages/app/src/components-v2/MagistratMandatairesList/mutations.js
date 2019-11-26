import gql from "graphql-tag";

export const CHOOSE_MANDATAIRE = gql`
  mutation chooseMandataire(
    $ti: Int!
    $mandataire_id: Int!
    $type: String!
    $civilite: String!
    $annee: String!
    $cabinet: String
    $urgent: Boolean!
    $judgmentDate: date
    $numero_rg: String!
  ) {
    insert_mesures(
      objects: {
        is_urgent: $urgent
        judgment_date: $judgmentDate
        cabinet: $cabinet
        ti_id: $ti
        mandataire_id: $mandataire_id
        type: $type
        civilite: $civilite
        annee: $annee
        numero_rg: $numero_rg
        status: "Mesure en attente"
      }
    ) {
      returning {
        id
        cabinet
        civilite
        code_postal
        departement {
          nom
          region {
            nom
          }
        }
        status
        type
        ville
        ti_id
        residence
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
      }
    }
    update_mandataires(where: { id: { _eq: $mandataire_id } }, _inc: { mesures_en_attente: 1 }) {
      affected_rows
      returning {
        id
        mesures_en_attente
      }
    }
  }
`;

export const CHOOSE_SERVICE = gql`
  mutation chooseService(
    $ti: Int!
    $service_id: Int!
    $type: String!
    $civilite: String!
    $annee: String!
    $cabinet: String
    $judgmentDate: date
    $numero_rg: String!
    $urgent: Boolean!
  ) {
    insert_mesures(
      objects: {
        ti_id: $ti
        is_urgent: $urgent
        cabinet: $cabinet
        service_id: $service_id
        type: $type
        civilite: $civilite
        annee: $annee
        numero_rg: $numero_rg
        judgment_date: $judgmentDate
        status: "Mesure en attente"
      }
    ) {
      returning {
        service_id
        id
        cabinet
        civilite
        code_postal
        departement {
          nom
          region {
            nom
          }
        }
        status
        type
        ville
        ti_id
        residence
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
      }
    }
    update_services(where: { id: { _eq: $service_id } }, _inc: { mesures_awaiting: 1 }) {
      affected_rows
      returning {
        id
        mesures_awaiting
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation InsertComment($comment: String!, $service_id: Int, $ti_id: Int!, $mandataire_id: Int) {
    insert_commentaires(
      objects: {
        comment: $comment
        service_id: $service_id
        ti_id: $ti_id
        mandataire_id: $mandataire_id
      }
    ) {
      affected_rows
      returning {
        comment
        created_at
        id
        service_id
        mandataire_id
        ti_id
      }
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation UpdateComment($comment: String!, $id: Int) {
    update_commentaires(_set: { comment: $comment }, where: { id: { _eq: $id } }) {
      affected_rows
      returning {
        comment
        created_at
        id
        service_id
        mandataire_id
        ti_id
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($id: Int!) {
    delete_commentaires(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
