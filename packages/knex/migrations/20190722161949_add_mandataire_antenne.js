exports.up = async function (knex) {
  await knex.schema.alterTable("mandataires", function (table) {
    table.integer("antenne_id");
    table.foreign("antenne_id").references("id").inTable("service_antenne");
  });

  const mandataires = await knex("mandataires").whereNotNull("service_id");
  const antennes = await knex("service_antenne");
  await Promise.all(
    mandataires.map((mandataire) => {
      const serviceId = mandataire.service_id;
      const antenne = antennes.find((antenne) => antenne.id === serviceId);
      return knex("mandataires")
        .where({ id: mandataire.id })
        .update({ antenne_id: antenne.id });
    })
  );

  return knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("service_id");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("antenne_id");
  });

  return knex.schema.alterTable("mandataires", function (table) {
    table.integer("service_id");
    table.foreign("service_id").references("id").inTable("services");
  });
};
