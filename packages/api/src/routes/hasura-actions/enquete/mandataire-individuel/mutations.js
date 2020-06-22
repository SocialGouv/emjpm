module.exports = {
  SUBMIT_ENQUETE_REPONSE: `
  mutation submit_enquete_reponse($id: Int!, $submittedAt: timestamptz!) {
    update_enquete_reponses_by_pk(pk_columns: {id: $id}, _set: {submitted_at: $submittedAt, status: "submitted"}) {
      id
      enquete_reponses_activite_id
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

  INIT_ENQUETE_REPONSE: `
  mutation create_enquete_individuel_reponse($enqueteId: Int!, $mandataireId: Int!, $nom: String, $departement: String, $region: String) {
    insert_enquete_reponses_one(object: {enquete_id: $enqueteId, mandataire_id: $mandataireId, enquete_reponses_activite: {data: {}}, enquete_reponses_agrements_formation: {data: {}}, enquete_reponses_informations_mandataire: {data: {nom: $nom, departement: $departement, region: $region}}, enquete_reponses_population: {data: {}}, enquete_reponses_prestations_sociale: {data: {}}}) {
      id
      enquete_reponses_activite_id
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
