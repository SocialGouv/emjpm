exports.up = async function(knex) {
  await knex.schema.createTable("individuel_agrements", function(table) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires")
      .notNullable();
    table.boolean("debut_activite_avant_2009");
    table.integer("annee_debut_activite");
    table.integer("annee_agrement");
  });
  await knex.schema.createTable("individuel_agrement_departements", function(
    table
  ) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires")
      .notNullable();
    table
      .integer("agrement_id")
      .references("id")
      .inTable("individuel_agrements")
      .notNullable();
    table
      .integer("departement_id")
      .references("id")
      .inTable("departements")
      .notNullable();
    table.boolean("departement_financeur").defaultTo(false);
  });
  return knex.raw(`
  insert into individuel_agrements (mandataire_id) (select id from mandataires);
  `);
};

exports.down = async function(knex) {
  await knex.raw("DROP TABLE individuel_agrement_departements");
  return knex.raw("DROP TABLE individuel_agrements");
};
