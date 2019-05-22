exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", function(table) {
    table.integer("service_id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("users", function(table) {
    table.dropColumn("service_id");
  });
};
