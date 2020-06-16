exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dateTime("updateMesure");
  });
};

exports.down = function () {
  return Promise.resolve();
};
