exports.up = function(knex, Promise) {
  return knex.schema.dropTable("EtablissementPreposes");
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
