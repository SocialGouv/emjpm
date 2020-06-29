function buildOne(enqueteReponse) {
  const item = {
    enqueteReponse,
    reponse_id: enqueteReponse.reponse_id,
    uploaded_on: enqueteReponse.uploaded_on,
    submitted_at: enqueteReponse.submitted_at,
    status: enqueteReponse.status,
    user_type: enqueteReponse.user_type,
    user: enqueteReponse.mandataire?.user,
    etablissement: enqueteReponse.service?.etablissement,
    departement: undefined,
    ville: undefined,
  };

  if (enqueteReponse.service) {
    item.ville = enqueteReponse.service.ville;
    item.departement = enqueteReponse.service.departement;
  } else if (enqueteReponse.mandataire) {
    item.ville = enqueteReponse.mandataire.ville;
    const lb_user = enqueteReponse.mandataire.lb_user;
    if (lb_user) {
      const departement_financeur = lb_user.lb_departements
        ? lb_user.lb_departements.find((d) => d.departement_financeur)
        : undefined;
      item.departement = departement_financeur ? departement_financeur.departement : undefined;
    }
  }
  return item;
}
function buildMany(enqueteReponses) {
  return enqueteReponses.map((x) => buildOne(x));
}

export const directionEnqueteReponseResumeBuilder = {
  buildOne,
  buildMany,
};
