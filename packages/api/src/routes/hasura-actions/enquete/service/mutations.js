module.exports = {
  INIT_ENQUETE_REPONSE: `
    mutation create_enquete_service_reponse($enqueteId: Int!, $serviceId: Int!, $departement: String, $region: String, $nom: String) {
      insert_enquete_reponses_one(object: {enquete_id: $enqueteId, user_type: "service", service_id: $serviceId, enquete_reponses_activite: {data: {}}, enquete_reponses_service_information: {data: {departement: $departement, region: $region, nom: $nom}}}) {
        id
        service_id
        submitted_at
        created_at
        enquete_id
        enquete_reponses_service_informations_id
        enquete_reponses_activite_id
        enquete_reponses_populations_id
      }
    }
  `,
};
