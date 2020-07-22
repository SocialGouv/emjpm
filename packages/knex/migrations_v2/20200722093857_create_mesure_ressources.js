exports.up = async function (knex) {
  return knex.schema.createTable("mesure_ressources", (table) => {
    table.increments();
    table.integer("annee").nullable();
    table.integer("niveau_ressource").notNullable();
    table.jsonb("prestations_sociales").notNullable();
    table
      .integer("mesure_id")
      .references("id")
      .inTable("mesures")
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("mesure_ressources");
};
