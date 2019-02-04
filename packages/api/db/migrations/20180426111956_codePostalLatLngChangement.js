exports.up = function(knex) {
  return knex.schema.alterTable("codePostalLatLngs", function(table) {
    table.unique("code_postal");
  });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
