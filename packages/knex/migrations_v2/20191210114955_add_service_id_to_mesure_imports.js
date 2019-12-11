exports.up = async function(knex) {
  await knex.schema.alterTable("mesures_import", function(table) {
    table.integer("service_id").defaultTo(null);
    table
      .foreign("service_id")
      .references("id")
      .inTable("services");
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("mesures_import", function(table) {
    table.dropForeign("service_id");
    table.dropColumn("service_id");
  });
};
