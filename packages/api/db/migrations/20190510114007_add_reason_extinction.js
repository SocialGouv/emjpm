exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.string("reason_extinction");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.dropColumn("reason_extinction");
  });
};
