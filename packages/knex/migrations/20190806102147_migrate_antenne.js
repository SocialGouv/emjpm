exports.up = async function (knex) {
  await knex.schema.alterTable("mandataires", function (table) {
    table.integer("service_id");
  });

  await knex.raw(
    `update mandataires m
        set service_id = (
                          select service_id from service_antenne where id = m.antenne_id
                        )`
  );

  await knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("antenne_id");
  });

  await knex("service_antenne").del();

  await knex.schema.alterTable("service_antenne", function (table) {
    table.integer("bak_mandataire_id").unique();
  });

  // MIGRATION DES USER DE TYPE service EN ANTENNE
  const users = await knex("users").where({ type: "service" });
  const mandataireIds = [];
  for (const user of users) {
    const service = await knex("services").where("id", user.service_id).first();
    const mandataireList = await knex("mandataires").where("user_id", user.id);

    if (mandataireList.length > 0) {
      let headquarters = true;
      for (const mandataire of mandataireList) {
        mandataireIds.push(mandataire.id);
        await knex("service_antenne").insert({
          bak_mandataire_id: mandataire.id,
          service_id: service.id,
          name: mandataire.etablissement,
          headquarters,
          address_street: mandataire.adresse,
          address_zip_code: mandataire.code_postal,
          address_city: mandataire.ville,
          contact_lastname: mandataire.contact_nom,
          contact_firstname: mandataire.contact_prenom,
          contact_email: mandataire.contact_email,
          contact_phone: mandataire.telephone,
          mesures_awaiting: mandataire.mesures_en_attente || 0,
          mesures_in_progress: mandataire.mesures_en_cours || 0,
          mesures_max: mandataire.dispo_max || 0,
          date_mesure_update: mandataire.date_mesure_update,
        });
        headquarters = false;
      }
    } else {
      await knex("service_antenne").insert({
        service_id: service.id,
        name: service.etablissement,
        headquarters: true,
        address_street: service.adresse,
        address_zip_code: service.code_postal,
        address_city: service.ville,
        contact_lastname: service.nom,
        contact_firstname: service.prenom,
        contact_email: service.email,
        contact_phone: service.telephone,
        mesures_awaiting: 0,
        mesures_in_progress: 0,
        mesures_max: service.dispo_max || 0,
      });
    }
  }

  // MIGRATION DES MANDATAIRES EN ANNTENNES
  const mandataires = await knex("mandataires")
    .whereNotIn("id", mandataireIds)
    .andWhere((builder) => builder.whereNotNull("service_id"));

  for (const mandataire of mandataires) {
    await knex("service_antenne").insert({
      bak_mandataire_id: mandataire.id,
      service_id: mandataire.service_id,
      name: mandataire.etablissement,
      headquarters: false,
      address_street: mandataire.adresse,
      address_zip_code: mandataire.code_postal,
      address_city: mandataire.ville,
      contact_lastname: mandataire.contact_nom,
      contact_firstname: mandataire.contact_prenom,
      contact_email: mandataire.contact_email,
      contact_phone: mandataire.telephone,
      mesures_in_progress: mandataire.mesures_en_cours || 0,
      mesures_max: mandataire.dispo_max || 0,
    });
  }

  await knex.raw(
    `update mesures m set antenne_id = (select id from service_antenne where bak_mandataire_id = m.mandataire_id)`
  );

  return knex.raw(
    `update mesures m set mandataire_id = null where antenne_id is not null`
  );
};

exports.down = async function (knex) {
  await knex.schema.alterTable("service_antenne", function (table) {
    table.dropColumn("bak_mandataire_id");
  });
  return knex.schema.alterTable("mandataires", function (table) {
    table.integer("antenne_id");
    table.dropColumn("service_id");
  });
};
