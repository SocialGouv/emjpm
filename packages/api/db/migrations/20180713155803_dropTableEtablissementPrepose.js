exports.up = function(knex) {
  return knex.schema.dropTable("EtablissementPreposes");
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
