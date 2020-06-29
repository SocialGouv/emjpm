function buildOne(enqueteReponse) {
  return {
    enqueteReponse,
    reponse_id: enqueteReponse.reponse_id,
    submitted_at: enqueteReponse.submitted_at,
    status: enqueteReponse.status,
    user_type: enqueteReponse.user_type,
    user: enqueteReponse.mandataire?.user,
    etablissement: enqueteReponse.service?.etablissement,
    departement: enqueteReponse.service
      ? enqueteReponse.service.departement
      : enqueteReponse.mandataire?.departement,
    ville: enqueteReponse.service ? enqueteReponse.service.ville : enqueteReponse.mandataire?.ville,
  };
}
function buildMany(enqueteReponses) {
  return enqueteReponses.map((x) => buildOne(x));
}

export const directionEnqueteReponseResumeBuilder = {
  buildOne,
  buildMany,
};
