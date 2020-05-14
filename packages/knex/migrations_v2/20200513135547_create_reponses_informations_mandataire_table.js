exports.up = async knex => {
  await knex.schema.createTable(
    "enquete_reponses_informations_mandataire",
    table => {
      table.increments();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("last_update").defaultTo(knex.fn.now());

      table.boolean("benevole").nullable();
      table.string("forme_juridique").nullable();
      table.string("sexe").nullable();
      table.string("anciennete").nullable();

      table.string("estimation_etp").nullable();
      table.string("secretaire_specialise_etp").nullable();
      table.boolean("local_professionnel").nullable();
    }
  );
};

exports.down = async knex => {
  await knex.raw("DROP TABLE enquete_reponses_informations_mandataire");
};
