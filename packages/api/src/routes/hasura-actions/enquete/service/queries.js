module.exports = {
  ENQUETE_REPONSE_SERVICE: `
  query enquete_reponses_service($enqueteId: Int!, $serviceId: Int!) {
    enquete_reponses(where: {enquete_id: {_eq: $enqueteId}, service_id: {_eq: $serviceId}}) {
      id
      enquete_id
    }
  }  
`,
};
