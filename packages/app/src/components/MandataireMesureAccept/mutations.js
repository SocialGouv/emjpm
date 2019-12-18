import gql from "graphql-tag";

export const ACCEPT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $department_id: Int!
    $date_ouverture: date!
    $residence: String!
    $code_postal: String!
    $ville: String!
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        department_id: $department_id
        status: "Mesure en cours"
        date_ouverture: $date_ouverture
        residence: $residence
        code_postal: $code_postal
        ville: $ville
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
        residence
        mandataire_id
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
      }
    }
  }
`;

export const UPDATE_MANDATAIRES_COUTERS = gql`
  mutation UpdateMandatairesCounter(
    $mesures_in_progress: Int!
    $mandataireId: Int!
    $mesures_awaiting: Int!
  ) {
    update_mandataires(
      where: { id: { _eq: $mandataireId } }
      _inc: { mesures_en_cours: $mesures_in_progress, mesures_en_attente: $mesures_awaiting }
    ) {
      affected_rows
      returning {
        id
        mesures_en_cours
        mesures_en_attente
      }
    }
  }
`;
