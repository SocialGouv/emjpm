exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.string("status");
  });
};

exports.down = function () {
  return Promise.resolve();
};
