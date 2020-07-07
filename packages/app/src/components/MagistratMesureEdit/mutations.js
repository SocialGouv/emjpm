import gql from "graphql-tag";

export const EDIT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $type: String
    $civilite: String
    $annee: String
    $numero_rg: String
    $cabinet: String
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        type: $type
        civilite: $civilite
        annee: $annee
        numero_rg: $numero_rg
        cabinet: $cabinet
      }
    ) {
      returning {
        id
        cabinet
        civilite
        code_postal
        departement {
          id
          nom
          region {
            id
            nom
          }
        }
        status
        type
        ville
        lieu_vie
        numero_rg
        numero_dossier
        etablissement
        annee
        date_ouverture
        pays
      }
    }
  }
`;
