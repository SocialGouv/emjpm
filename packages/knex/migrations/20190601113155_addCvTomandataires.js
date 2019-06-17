exports.up = function(knex) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.string("cv");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.dropColumn("cv");
  });
};
