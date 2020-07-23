function buildOne(enqueteReponse) {
  const item = {
    enqueteReponse,
    reponse_id: enqueteReponse.reponse_id,
    created_at: enqueteReponse.created_at,
    uploaded_on: enqueteReponse.uploaded_on,
    submitted_at: enqueteReponse.submitted_at,
    departement: enqueteReponse.departement,
    status: enqueteReponse.status,
    user_type: enqueteReponse.user_type,
    user: undefined,
    etablissement: undefined,
    ville: undefined,
    sortName: undefined,
    uniqueId: undefined,
  };

  if (enqueteReponse.service) {
    item.uniqueId = enqueteReponse.service.id;
    item.ville = enqueteReponse.service.ville;
    item.etablissement = enqueteReponse.service?.etablissement;
    item.sortName = item.etablissement ? item.etablissement.toLowerCase() : "";
    if (!item.departement) {
      item.departement = enqueteReponse.service.departement;
    }
  } else if (enqueteReponse.mandataire) {
    item.uniqueId = enqueteReponse.mandataire.id;
    item.ville = enqueteReponse.mandataire.ville;
    item.user = enqueteReponse.mandataire?.user;
    item.sortName = item.user ? `${item.user.nom} ${item.user.prenom}`.toLowerCase() : "";
    if (!item.departement) {
      const lb_user = enqueteReponse.mandataire.lb_user;
      if (lb_user) {
        const departement_financeur = lb_user.lb_departements
          ? lb_user.lb_departements.find((d) => d.departement_financeur)
          : undefined;
        item.departement = departement_financeur ? departement_financeur.departement : undefined;
      }
    }
  }
  return item;
}
function buildMany(enqueteReponses) {
  return enqueteReponses.map((x) => buildOne(x));
}
function buildManyFromMandatairesSansReponse(mandataires_sans_reponse) {
  return mandataires_sans_reponse.map((mandataire) =>
    buildOne({
      mandataire,
    })
  );
}
function buildManyFromServicesSansReponse(services_sans_reponse) {
  return services_sans_reponse.map((service) =>
    buildOne({
      service,
    })
  );
}

export const directionEnqueteReponseResumeBuilder = {
  buildOne,
  buildMany,
  buildManyFromMandatairesSansReponse,
  buildManyFromServicesSansReponse,
};
