function buildOne(enqueteReponse) {
  const item = {
    created_at: enqueteReponse.created_at,
    departement: enqueteReponse.departement,
    enqueteReponse,
    etablissement: undefined,
    reponse_id: enqueteReponse.reponse_id,
    sortName: undefined,
    status: enqueteReponse.status,
    submitted_at: enqueteReponse.submitted_at,
    uniqueId: undefined,
    uploaded_on: enqueteReponse.uploaded_on,
    user: undefined,
    user_type: enqueteReponse.user_type,
    ville: undefined,
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
    item.sortName = item.user
      ? `${item.user.nom} ${item.user.prenom}`.toLowerCase()
      : "";
    if (!item.departement) {
      const liste_blanche = enqueteReponse.mandataire.liste_blanche;
      if (liste_blanche) {
        const departement_financeur =
          liste_blanche.mandataire_individuel_departements
            ? liste_blanche.mandataire_individuel_departements.find(
                (d) => d.departement_financeur
              )
            : undefined;
        item.departement = departement_financeur
          ? departement_financeur.departement
          : undefined;
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
  buildMany,
  buildManyFromMandatairesSansReponse,
  buildManyFromServicesSansReponse,
  buildOne,
};
