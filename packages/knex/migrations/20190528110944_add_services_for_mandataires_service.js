const { createService } = require("../../api/db/queries/inscription");
const { updateUser } = require("../../api/db/queries/users");

exports.up = function(knex, Promise) {
  const mandataires = knex("mandataires")
    .innerJoin("users", "mandataires.user_id", "users.id")
    .where("users.type", "service");

  return mandataires.then(mandataires =>
    Promise.all(
      mandataires.map(mandataire =>
        createService({
          etablissement: mandataire.etablissement,
          nom: mandataire.nom,
          prenom: mandataire.prenom,
          email: mandataire.email,
          telephone: mandataire.telephone,
          adresse: mandataire.adresse,
          code_postal: mandataire.code_postal,
          ville: mandataire.ville,
          dispo_max: mandataire.dispo_max
        }).then(serviceId => {
          return updateUser(mandataire.user_id, {
            service_id: serviceId[0]
          });
        })
      )
    )
  );
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
