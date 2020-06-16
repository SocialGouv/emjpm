exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.integer("etablissement_id");
  });
};

exports.down = function () {
  return Promise.resolve();
};
