exports.up = async function(knex) {
  await knex.schema.createTable("individuel_formations", function(table) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("mandataire_id")
      .references("id")
      .inTable("mandataires")
      .notNullable();
    table.integer("cnc_mjpm_annee_obtention");
    table.integer("cnc_mjpm_heure_formation");
    table.integer("cnc_maj_annee_obtention");
    table.integer("cnc_maj_heure_formation");
    table.integer("cnc_dpf_annee_obtention");
    table.integer("cnc_dpf_heure_formation");
    table.integer("niveau_qualification");
    table.integer("niveau_qualification_secretaire_spe");
  });
  return knex.raw(`
  insert into individuel_formations (mandataire_id) (select id from mandataires);
  `);
};

exports.down = async function(knex) {
  await knex.raw("DROP TABLE individuel_formations");
};
