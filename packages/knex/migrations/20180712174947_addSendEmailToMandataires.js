exports.up = function (knex) {
  return knex.schema.alterTable("mandataires", function (table) {
    table.dateTime("email_send");
  });
};

exports.down = function () {
  return Promise.resolve();
};
