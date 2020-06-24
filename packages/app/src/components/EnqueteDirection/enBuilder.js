function buildOne(enqueteReponse) {
  return {
    enqueteReponse,
    reponse_id: enqueteReponse.reponse_id,
    submitted_at: enqueteReponse.submitted_at,
    status: enqueteReponse.status,
    user: enqueteReponse.mandataire?.user,
    departement: enqueteReponse.mandataire?.departement,
    ville: enqueteReponse.mandataire?.ville,
  };
}
function buildMany(enqueteReponses) {
  return enqueteReponses.map((x) => buildOne(x));
}

export const directionEnqueteReponseResumeBuilder = {
  buildOne,
  buildMany,
};
