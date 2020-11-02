import gql from "graphql-tag";

export const CLOSE_MESURE = gql`
  mutation closeMesure(
    $id: Int!
    $cause_sortie: cause_sortie_type!
    $date_fin_mesure: date!
  ) {
    update_mesures(
      where: { id: { _eq: $id } }
      _set: {
        date_fin_mesure: $date_fin_mesure
        cause_sortie: $cause_sortie
        status: "eteinte"
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
        mandataire_id
        numero_rg
        numero_dossier
        annee_naissance
        date_nomination
      }
    }
  }
`;

export const CALCULATE_MESURES = gql`
  mutation calculateMesures($mandataireId: Int, $serviceId: Int) {
    calculate_mesures(mandataireId: $mandataireId, serviceId: $serviceId) {
      en_cours
      en_attente
    }
  }
`;
