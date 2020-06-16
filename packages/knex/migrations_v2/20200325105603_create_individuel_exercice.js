exports.up = async function (knex) {
  await knex.schema.createTable("individuel_exercices", function (table) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires")
      .notNullable();
    table.string("estimation_etp");
    table.boolean("secretaire_specialise");
    table.string("secretaire_specialise_etp");
    table.boolean("cumul_prepose");
    table.string("cumul_prepose_etp");
    table.boolean("cumul_delegue_service");
    table.string("cumul_delegue_service_etp");
  });
  return knex.raw(`
  insert into individuel_exercices (mandataire_id) (select id from mandataires);
  `);
};

exports.down = function (knex) {
  return knex.raw("DROP TABLE individuel_exercices");
};
