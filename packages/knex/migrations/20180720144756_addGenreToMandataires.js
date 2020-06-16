exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.string("genre");
  });
};

exports.down = function () {
  return Promise.resolve();
};
