exports.up = async function(knex) {
  await knex.schema.createTable(
    "enquete_reponses_prepose_personel_formation",
    table => {
      table.increments();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("last_update").defaultTo(knex.fn.now());
      table.integer("nb_preposes_mjpm").nullable();
      table.float("nb_preposes_mjpm_etp").nullable();
      table.jsonb("formation_preposes_mjpm").nullable();
      table.jsonb("autres_informations").nullable();
      table.integer("nb_preposes_homme").nullable();
      table.integer("nb_preposes_femme").nullable();
      table.integer("nb_autre_personnel").nullable();
      table.float("nb_autre_personnel_etp").nullable();
    }
  );

  await knex.schema.alterTable("enquete_reponses", table => {
    table
      .integer("enquete_reponses_prepose_personel_formation_id")
      .references("id")
      .inTable("enquete_reponses_prepose_personel_formation");
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("enquete_reponses", table => {
    table.dropColumn("enquete_reponses_prepose_personel_formation_id");
  });

  await knex.schema.dropTable("enquete_reponses_prepose_personel_formation");
};
