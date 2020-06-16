exports.up = function (knex) {
  return knex.schema.dropTable("service_antennes");
};

exports.down = function (knex) {
  return knex.schema.createTable("service_antennes", (table) => {
    table.increments();
    table.string("etablissement");
    table.string("poste");
    table.string("email");
    table.string("type");
    table.string("code_postal");
    table.string("ville");
    table.string("telephone");
    table.string("adresse");
    table.integer("mesures_en_cours");
    table.integer("dispo_max");
    table.string("telephone_portable");
    table.string("nom");
    table.string("prenom");
    table.integer("mandataire_id");
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};
