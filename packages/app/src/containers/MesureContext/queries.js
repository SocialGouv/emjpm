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
      created_at
      editor_id
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
      en_attente_reouverture
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
        mesure_ressources_prestations_sociales {
          prestations_sociales
        }
      }
      mesure_en_attente_reouvertures(limit: 1) {
        id
        mesure_id
        annee_naissance
        cabinet
        champ_mesure
        civilite
        judgment_date
        magistrat_id
        greffier_id
        mandataire_id
        service_id
        ti_id
        is_urgent
        antenne_id
        nature_mesure
      }
    }
  }
`;
