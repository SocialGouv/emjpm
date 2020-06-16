exports.up = async function (knex) {
  await knex.schema.createTable("service_antenne", (table) => {
    table.increments();
    table.integer("service_id").notNullable();
    table.string("name");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.foreign("service_id").references("services.id");
  });

  const services = await knex("services");

  return Promise.all(
    services.map((service) => {
      return knex("service_antenne").insert({
        service_id: service.id,
        name: service.etablissement,
      });
    })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTable("service_antenne");
};
