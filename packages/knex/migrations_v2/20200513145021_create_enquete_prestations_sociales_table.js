exports.up = async (knex) => {
  await knex.schema.createTable(
    "enquete_reponses_prestations_sociales",
    (table) => {
      table.increments();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("last_update").defaultTo(knex.fn.now());

      table.integer("aah").nullable();
      table.integer("pch").nullable();
      table.integer("asi").nullable();
      table.integer("rsa").nullable();
      table.integer("als_apl").nullable();
      table.integer("aspa").nullable();
      table.integer("apa").nullable();
    }
  );
};

exports.down = async (knex) => {
  await knex.raw("DROP TABLE enquete_reponses_prestations_sociales");
};
