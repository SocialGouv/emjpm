exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.float("nb_secretariat").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.integer("nb_secretariat").alter();
  });
};
