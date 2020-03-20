exports.up = function(knex) {
  return knex.schema.createTable("mandataire_agrements", function(table) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .boolean("debut_activite_avant_2009")
      .defaultTo(false)
      .notNullable();
    table.integer("annee_debut_activite");
    table.integer("annee_agrement").notNullable();
    table.string("departement_financeur").notNullable();
    table.specificType("departements_agrement", "text ARRAY").notNullable();
  });
};

exports.down = function(knex) {
  return knex.raw("DROP TABLE mandataire_agrements");
};
