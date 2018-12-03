exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.text("zip").alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.string("zip").alter();
  });
};
