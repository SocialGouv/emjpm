exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.text("zip").alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.string("zip").alter();
  });
};
