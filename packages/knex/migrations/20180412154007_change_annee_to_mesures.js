exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.string("annee").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.string("annee").alter();
  });
};
