module.exports = {
  INIT_ENQUETE_REPONSE: `
    mutation create_enquete_service_reponse(
      $enqueteId: Int!,
      $departementCode: String!,
      $serviceId: Int!,
      $departement: String,
      $region: String,
      $nom: String
    ) {
      insert_enquete_reponses
        (objects: [
          {
            enquete_id: $enqueteId,
            departement_code: $departementCode,
            user_type: "service",
            service_id: $serviceId,
            enquete_reponses_populations: {data: [{

            }]},
            enquete_reponses_activites: {data: [{

            }]},
            enquete_reponses_service_personnel_formations: {data: [{

            }]},
            enquete_reponses_service_informations: {data: [{
              departement: $departement,
              region: $region,
              nom: $nom
            }]}
          }
        ]){
          returning {
            id
            departement_code
            user_type
            service_id
            submitted_at
            created_at
            enquete_id
            status
          }
        }
      }
  `,
  SUBMIT_ENQUETE_REPONSE: `
  mutation submit_enquete_reponse($id: Int!, $submittedAt: timestamptz!) {
    update_enquete_reponses_by_pk(pk_columns: {id: $id}, _set: {submitted_at: $submittedAt, status: "submitted"}) {
      id
      departement_code
      user_type
      service_id
      submitted_at
      created_at
      enquete_id
      status
    }
  }
  `,
};
