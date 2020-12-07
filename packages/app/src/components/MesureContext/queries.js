import gql from "graphql-tag";

export const MESURE_CONTEXT_QUERY = gql`
  query MESURE_CONTEXT_QUERY($id: Int) {
    mesures(
      where: { id: { _eq: $id } }
      limit: null
      order_by: { created_at: desc }
      offset: null
    ) {
      service_antenne {
        name
        id
      }
      id
      cabinet
      civilite
      code_postal
      latitude
      longitude
      antenne_id
      latitude
      longitude
      judgment_date
      is_urgent
      mandataire_id
      service_id
      pays
      departement {
        id
        nom
        region {
          id
          nom
        }
      }
      ti {
        id
        etablissement
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
      date_protection_en_cours
      date_premier_mesure
      mesure_etats(order_by: { date_changement_etat: desc }) {
        champ_mesure
        code_postal
        date_changement_etat
        id
        lieu_vie
        nature_mesure
        pays
        type_etablissement
        ville
      }
      mesure_ressources(order_by: { annee: desc }) {
        id
        annee
        niveau_ressource
        prestations_sociales
      }
    }
  }
`;
