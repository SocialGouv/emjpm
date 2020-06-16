exports.up = function (knex) {
  return knex.schema.createTable("codePostalLatLngs", function (table) {
    table.increments();
    table.string("code_postal");
    table.float("latitude");
    table.float("longitude");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("codePostalLatLngs");
};
