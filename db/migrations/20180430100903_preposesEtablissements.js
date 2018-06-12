exports.up = function(knex, Promise) {
  return knex.schema.createTable("EtablissementPreposes", function(table) {
    table.increments();
    table.string("etablissement");
    table.string("code_postal");
    table.string("ville");
    table.string("telephone");
    table.string("adresse");
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("EtablissementPreposes");
};
