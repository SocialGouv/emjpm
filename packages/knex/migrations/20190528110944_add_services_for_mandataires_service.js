//

// Create service for existing mandataires
exports.up = async (knex) => {
  const mandataires = await knex("mandataires")
    .innerJoin("users", "mandataires.user_id", "users.id")
    .where("users.type", "service");

  await Promise.all(
    mandataires.map(async (mandataire) => {
      const [service_id] = await knex.table("services").insert(
        {
          etablissement: mandataire.etablissement,
          nom: mandataire.nom,
          prenom: mandataire.prenom,
          email: mandataire.email,
          telephone: mandataire.telephone,
          adresse: mandataire.adresse,
          code_postal: mandataire.code_postal,
          ville: mandataire.ville,
          dispo_max: mandataire.dispo_max,
        },
        "id"
      );

      await knex("users").where({ id: mandataire.user_id }).update({
        service_id,
      });
    })
  );
};

exports.down = async (knex) => {
  const services = await knex("services").select("id");
  await Promise.all(
    services.map(async ({ id }) => {
      await knex("users").where({ id }).update({
        service_id: null,
      });
      await knex.table("services").where({ id }).delete();
    })
  );
};
