exports.up = function (knex) {
  return knex.schema.dropTable("EtablissementPreposes");
};

exports.down = function () {
  return Promise.resolve();
};
