module.exports = {
  INIT_ENQUETE_REPONSE: `
    mutation create_enquete_individuel_reponse($enqueteId: Int!, $departementId: Int!, $mandataireId: Int!, $departement: String, $region: String) {
      insert_enquete_reponses_one(object: {enquete_id: $enqueteId, departement_id: $departementId, user_type: "prepose", mandataire_id: $mandataireId, enquete_reponses_prepose_prestations_sociale: {data: {}}, enquete_reponses_activite: {data: {}}, enquete_reponses_financement: {data: {}}, enquete_reponses_modalites_exercice: {data: {departement: $departement, region: $region}}, enquete_reponses_population: {data: {}}, enquete_reponses_prepose_personel_formation: {data: {}}}) {
        id
        departement_id
        user_type
        enquete_reponses_activite_id
        enquete_reponses_financement_id
        enquete_reponses_modalites_exercice_id
        enquete_reponses_agrements_formations_id
        enquete_reponses_informations_mandataire_id
        enquete_reponses_populations_id
        enquete_reponses_prepose_prestations_sociales_id
        enquete_reponses_prepose_personel_formation_id
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
      departement_id
      enquete_reponses_activite_id
      enquete_reponses_financement_id
      enquete_reponses_modalites_exercice_id
      enquete_reponses_agrements_formations_id
      enquete_reponses_informations_mandataire_id
      enquete_reponses_populations_id
      enquete_reponses_prestations_sociale_id
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
