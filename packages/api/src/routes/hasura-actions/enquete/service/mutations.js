module.exports = {
  INIT_ENQUETE_REPONSE: `
    mutation create_enquete_service_reponse($enqueteId: Int!, $serviceId: Int!) {
      insert_enquete_reponses_one(object: {enquete_id: $enqueteId, service_id: $serviceId}) {
        id
        service_id
        submitted_at
        created_at
        enquete_id
      }
    }
    `,
};
