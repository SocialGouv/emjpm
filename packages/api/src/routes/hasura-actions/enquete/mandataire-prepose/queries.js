module.exports = {
  ENQUETE_REPONSE_MANDATAIRE_PREPOSE: `
  query enquete_reponses_prepose($enqueteId: Int!, $mandataireId: Int!) {
    enquete_reponses(where: {enquete_id: {_eq: $enqueteId}, mandataire_id: {_eq: $mandataireId}}) {
      id
      submitted_at
      enquete_id
      enquete_reponses_modalites_exercice_id
      enquete_reponses_populations_id
    }
  }  
  `
};
