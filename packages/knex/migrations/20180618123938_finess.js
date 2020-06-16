exports.up = function (knex) {
  return knex.schema.createTable("etablissements", (table) => {
    table.increments();
    table.string("id_finess", 20);
    table.string("nom", 100).notNullable();
    table.string("adresse");
    table.string("code_postal", 10);
    table.string("ville", 100);
    table.string("tel", 15);
    table.string("fax", 15);
    table.float("latitude");
    table.float("longitude");
    table.index("nom");
    table.index("code_postal");
    table.index("latitude");
    table.index("longitude");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("etablissements");
};
