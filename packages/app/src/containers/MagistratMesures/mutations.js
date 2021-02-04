import gql from "graphql-tag";

export const EDIT_MESURE = gql`
  mutation editMesure(
    $id: Int!
    $nature_mesure: nature_mesure_enum
    $champ_mesure: champ_mesure_enum
    $civilite: civilite_enum
    $annee_naissance: String
    $numero_rg: String
    $cabinet: String
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        nature_mesure: $nature_mesure
        champ_mesure: $champ_mesure
        civilite: $civilite
        annee_naissance: $annee_naissance
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
        nature_mesure
        champ_mesure
        ville
        lieu_vie
        numero_rg
        numero_dossier
        annee_naissance
        date_nomination
        pays
      }
    }
  }
`;
