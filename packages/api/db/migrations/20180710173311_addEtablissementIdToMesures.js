exports.up = function(knex, Promise) {
  return knex.schema.alterTable("mesures", function(table) {
    table.integer("etablissement_id");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
