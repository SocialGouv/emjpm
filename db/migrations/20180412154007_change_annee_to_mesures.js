exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.string("annee").alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.date("annee").alter();
  });
};
