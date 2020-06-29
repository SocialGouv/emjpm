module.exports = {
  ENQUETE_REPONSE_DEFAULT_VALUES: `
    query enquete_service_default_values($serviceId: Int!) {
      services_by_pk(id: $serviceId) {
        id
        etablissement
        departement {
          nom
          region {
            nom
          }
        }
      }
    }  
  `,
  ENQUETE_REPONSE_SERVICE: `
    query enquete_reponses_service($enqueteId: Int!, $serviceId: Int!) {
      enquete_reponses(where: {enquete_id: {_eq: $enqueteId}, service_id: {_eq: $serviceId}}) {
        id
        status
        user_type
        submitted_at
        enquete_id
        enquete_reponses_service_informations_id
        enquete_reponses_activite_id
        enquete_reponses_populations_id
        service {
          id
        }
      }
    }  
  `,
};
