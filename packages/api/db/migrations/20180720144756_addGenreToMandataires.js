exports.up = function(knex) {
  return knex.schema.alterTable("mandataires", function(table) {
    table.string("genre");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
