exports.up = async function (knex) {
  await knex.schema.createTable(
    "enquete_reponses_prepose_prestations_sociales",
    (table) => {
      table.increments();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("last_update").defaultTo(knex.fn.now());
      table.jsonb("tutelle").nullable();
      table.jsonb("curatelle_simple").nullable();
      table.jsonb("curatelle_renforcee").nullable();
      table.jsonb("sauvegarde_autres_mesures").nullable();
      table.jsonb("maj").nullable();

      table.float("aah").nullable();
      table.float("pch").nullable();
      table.float("asi").nullable();
      table.float("rsa").nullable();
      table.float("als_apl").nullable();
      table.float("aspa").nullable();
      table.float("apa").nullable();
    }
  );

  await knex.schema.alterTable("enquete_reponses", (table) => {
    table
      .integer("enquete_reponses_prepose_prestations_sociales_id")
      .references("id")
      .inTable("enquete_reponses_prepose_prestations_sociales");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.dropColumn("enquete_reponses_prepose_prestations_sociales_id");
  });

  await knex.schema.dropTable("enquete_reponses_prepose_prestations_sociales");
};
