exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.string("zip");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.dropColumn("zip");
  });
};
