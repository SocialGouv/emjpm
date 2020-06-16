exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dropColumn("type");
  });
};

exports.down = function () {
  return Promise.resolve();
};
