exports.up = function(knex, Promise) {
  return knex.schema.createTable("serviceAntennes", function(table) {
    table.increments();
    table.string("etablissement");
    table.string("poste");
    table.string("email");
    table.string("type");
    table.string("code_postal");
    table.string("ville");
    table.string("telephone");
    table.string("adresse");
    table.integer("disponibilite");
    table.integer("dispo_max");
    table.string("telephone_portable");
    table.string("nom");
    table.string("prenom");
    table
      .integer("service_id")
      .references("id")
      .inTable("mandataires");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("serviceAntennes");
};
