exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dateTime("postDate").defaultTo(knex.fn.now());
  });
};

exports.down = function () {
  return Promise.resolve();
};
