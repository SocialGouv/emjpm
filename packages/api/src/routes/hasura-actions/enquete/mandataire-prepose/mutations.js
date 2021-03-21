module.exports = {
  INIT_ENQUETE_REPONSE: `
    mutation create_enquete_individuel_reponse($enqueteId: Int!, $departementCode: String!, $mandataireId: Int!, $departement: String, $region: String) {
      insert_enquete_reponses_one(object: {enquete_id: $enqueteId, departement_code: $departementCode, user_type: "prepose", mandataire_id: $mandataireId, enquete_reponses_prepose_prestations_sociale: {data: {}}, enquete_reponses_activite: {data: {}}, enquete_reponses_financement: {data: {}}, enquete_reponses_modalites_exercice: {data: {departement: $departement, region: $region}}, enquete_reponses_population: {data: {}}, enquete_reponses_prepose_personel_formation: {data: {}}}) {
        id
        departement_code
        user_type
        mandataire_id
        service_id
        status
        submitted_at
        created_at
        enquete_id
      }
    }
  `,
  SUBMIT_ENQUETE_REPONSE: `
  mutation submit_enquete_reponse($id: Int!, $submittedAt: timestamptz!) {
    update_enquete_reponses_by_pk(pk_columns: {id: $id}, _set: {submitted_at: $submittedAt, status: "submitted"}) {
      id
      departement_code
      mandataire_id
      service_id
      status
      submitted_at
      created_at
      enquete_id
    }
  }
  `,
};
