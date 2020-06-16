exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.integer("user_id");
  });
};

exports.down = function () {
  return Promise.resolve();
};
