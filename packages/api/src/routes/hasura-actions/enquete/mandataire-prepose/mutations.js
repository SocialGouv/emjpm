module.exports = {
  INIT_ENQUETE_REPONSE: `
    mutation create_enquete_individuel_reponse($enqueteId: Int!, $mandataireId: Int!) {
      insert_enquete_reponses_one(object: {enquete_id: $enqueteId, mandataire_id: $mandataireId, enquete_reponses_modalites_exercice: {data:{}}, enquete_reponses_population: {data: {}}}) {
        id
        enquete_reponses_activite_id
        enquete_reponses_agrements_formations_id
        enquete_reponses_informations_mandataire_id
        enquete_reponses_populations_id
        enquete_reponses_prestations_sociale_id
        mandataire_id
        service_id
        submitted_at
        created_at
        enquete_id
      }
    }
  `
};
