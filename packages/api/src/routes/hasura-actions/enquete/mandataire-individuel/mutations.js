module.exports = {
  INIT_ENQUETE_REPONSE: `
  mutation create_enquete_individuel_reponse($enqueteId: Int!, $mandataireId: Int!, $departementCode: String, $nom: String, $departement: String, $region: String) {
    insert_enquete_reponses
      (objects: [
        {
          enquete_id: $enqueteId,
          departement_code: $departementCode,
          user_type: "individuel",
          mandataire_id: $mandataireId,
          enquete_reponses_activites: {data: [{}]},
          enquete_reponses_agrements_formations: {data: [{}]},
          enquete_reponses_informations_mandataires: {data: [{nom: $nom, departement: $departement, region: $region}]},
          enquete_reponses_populations: {data: [{}]},
          enquete_reponses_prestations_sociales: {data: [{}]}
        }
      ]) {
      returning {
        id
        departement_code
        mandataire_id
        service_id
        status
        submitted_at
        created_at
        enquete_id
        user_type
      }
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
