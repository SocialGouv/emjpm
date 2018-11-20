exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.string("cabinet");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.dropColumn("cabinet");
  });
};
