exports.up = async function(knex) {
  await knex.schema.alterTable("mesures_import", function(table) {
    table.integer("service_id").defaultTo(null);
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("mesures_import", function(table) {
    table.dropColumn("service_id");
  });
};
