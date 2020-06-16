exports.up = async function (knex) {
  await knex.schema.alterTable("service_members", function (table) {
    table.boolean("is_admin").defaultTo(false).notNullable();
  });

  return knex.raw(`
    update service_members set is_admin = false;
  `);
};

exports.down = function (knex) {
  return knex.schema.alterTable("service_members", function (table) {
    table.dropColumn("is_admin");
  });
};
