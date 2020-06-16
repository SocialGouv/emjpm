exports.up = function (knex) {
  return knex.schema.createTable("services", function (table) {
    table.increments();
    table.string("etablissement");
    table.string("email");
    table.string("nom");
    table.string("prenom");
    table.string("code_postal");
    table.string("ville");
    table.string("telephone");
    table.string("adresse");
    table.integer("dispo_max");
    table.dateTime("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("services");
};
